
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/types/database';
import { toast } from '@/components/ui/use-toast';

export const useCards = (userId?: string) => {
  const queryClient = useQueryClient();

  const { data: cards, isLoading } = useQuery({
    queryKey: ['cards', userId],
    queryFn: async () => {
      const query = supabase.from('cards').select('*');
      if (userId) {
        query.eq('user_id', userId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as Card[];
    },
    enabled: !!userId,
  });

  const createCard = useMutation({
    mutationFn: async (card: Partial<Card> & { name: string }) => {
      const { data, error } = await supabase
        .from('cards')
        .insert([card])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', userId] });
      toast({
        title: "Card created",
        description: "Your new business card has been created successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to create card",
        description: error.message,
      });
    },
  });

  const updateCard = useMutation({
    mutationFn: async (card: Partial<Card> & { id: string }) => {
      const { data, error } = await supabase
        .from('cards')
        .update(card)
        .eq('id', card.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', userId] });
      toast({
        title: "Card updated",
        description: "Your business card has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to update card",
        description: error.message,
      });
    },
  });

  const deleteCard = useMutation({
    mutationFn: async (cardId: string) => {
      const { error } = await supabase
        .from('cards')
        .delete()
        .eq('id', cardId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', userId] });
      toast({
        title: "Card deleted",
        description: "Your business card has been deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete card",
        description: error.message,
      });
    },
  });

  return {
    cards,
    isLoading,
    createCard,
    updateCard,
    deleteCard,
  };
};
