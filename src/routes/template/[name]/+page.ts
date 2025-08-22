import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  const templateName = params.name;
  
  if (!templateName) {
    throw error(404, 'Template not found');
  }

  return {
    templateName
  };
};