import { supabase } from './supabaseClient';

export const linksApi = {
    /**
     * Create a new shortened link
     * @param {Object} data - The link data { destination_url, geo_targets, domain, slug, ... }
     * @returns {Promise<Object>} - The created link data
     */
    create: async (data) => {
        // Prepare data for Supabase (remove any undefined/extra fields if necessary)
        // Ensure json fields are handled correctly
        const payload = {
            destination_url: data.destination_url,
            domain: data.domain,
            slug: data.slug,
            geo_targets: data.geo_targets || [],
            // Add other fields if schema has them
        };

        const { data: newLink, error } = await supabase
            .from('links')
            .insert([payload])
            .select()
            .single();

        if (error) throw error;
        return newLink;
    },

    /**
     * Get link details by slug and domain (optional, but good for redirect)
     * @param {string} slug 
     * @returns {Promise<Object>}
     */
    getBySlug: async (slug) => {
        // Query Supabase for the link
        const { data, error } = await supabase
            .from('links')
            .select('*')
            .eq('slug', slug)
            .single();

        // .single() returns data object or null/error. 
        // If not found, data is null, error might be 'PGRST116' (row not found)

        if (error) return []; // Return empty array to match previous mocked behavior for "not found" checks if any
        return [data]; // Return array to match previous mocked behavior (App expects array)
    },

    /**
     * Get link details directly (helper)
     */
    getLinkDetail: async (slug) => {
        const { data, error } = await supabase
            .from('links')
            .select('*')
            .eq('slug', slug)
            .maybeSingle();

        if (error) throw error;
        return data;
    }
};
