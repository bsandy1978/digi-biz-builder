
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { NFCCard } from '@/types/database';
import { toast } from '@/components/ui/use-toast';

export const useNFCCards = () => {
  const queryClient = useQueryClient();

  const { data: nfcCards, isLoading } = useQuery({
    queryKey: ['nfc-cards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('nfc_cards')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as NFCCard[];
    },
  });

  const generateCard = useMutation({
    mutationFn: async (nfcId?: string) => {
      // First, get a new activation code
      const { data, error } = await supabase
        .rpc('generate_activation_code')
        .select();

      if (error) throw error;
      
      // Convert the activation code to string properly
      // The RPC function returns data that needs proper type handling
      const activationCode = data as unknown as string;
      
      // Create a new card with the generated activation code
      const { data: nfcCard, error: createError } = await supabase
        .from('nfc_cards')
        .insert({
          nfc_id: nfcId || null,
          activation_code: activationCode, // Now using the properly typed variable
          status: 'unclaimed'
        })
        .select()
        .single();

      if (createError) throw createError;
      return nfcCard;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nfc-cards'] });
      toast({
        title: "NFC Card generated",
        description: "A new NFC card has been generated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to generate NFC card",
        description: error.message,
      });
    },
  });

  return {
    nfcCards,
    isLoading,
    generateCard,
  };
};
