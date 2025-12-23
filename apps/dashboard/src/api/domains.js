import { supabase } from './supabaseClient';

export const domainsApi = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('domains')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },
    create: async (name) => {
        const { data, error } = await supabase
            .from('domains')
            .insert([{
                name,
                verified: true
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },
    delete: async (id) => {
        const { error } = await supabase
            .from('domains')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
