'use server';

import { db } from './db-client';
import { services, classModules, classes, prompts } from './schema';
import { desc } from 'drizzle-orm';

export async function getCatalogoServicios() {
  try {
    const data = await db.select().from(services).orderBy(desc(services.createdAt));
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getEducationContent() {
  try {
    const modulesData = await db.select().from(classModules).orderBy(classModules.createdAt);
    const classesData = await db.select().from(classes).orderBy(classes.createdAt);
    
    // Group classes by module
    const formattedLegal = modulesData.filter(m => m.area === 'Legal').map(mod => ({
      modulo: mod.title,
      clases: classesData.filter(c => c.moduleId === mod.id).map(c => ({
        titulo: c.title,
        duracion: c.duration,
        recursos: c.resources,
      }))
    }));

    const formattedTech = modulesData.filter(m => m.area === 'Tech').map(mod => ({
      modulo: mod.title,
      clases: classesData.filter(c => c.moduleId === mod.id).map(c => ({
        titulo: c.title,
        duracion: c.duration,
        recursos: c.resources,
      }))
    }));

    return {
      legal: formattedLegal,
      tech: formattedTech,
    };
  } catch (error) {
    console.error('Error fetching education modules:', error);
    return { legal: [], tech: [] };
  }
}

export async function getPromptsLibrary() {
  try {
    const data = await db.select().from(prompts).orderBy(prompts.createdAt);
    return data;
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return [];
  }
}
