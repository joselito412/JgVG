import { db } from './db-client';
import { services, classModules, classes, prompts } from './schema';
import { SERVICIOS_CATALOGO } from '../catalog/data';
import { AREA_LEGAL_DATA, AREA_TECH_DATA, PROMPT_LIBRARY } from '../education/data';

async function seed() {
  console.log('Seeding data to Supabase local...');

  // 1. Seed Services (Catálogo)
  console.log(`Seeding ${SERVICIOS_CATALOGO.length} services...`);
  for (const s of SERVICIOS_CATALOGO) {
    await db.insert(services).values({
      icon: s.icon,
      title: s.title,
      description: s.desc,
      category: s.tipo as 'Legal' | 'Tech' | 'Legal-Tech',
      color: s.color,
    });
  }

  // 2. Seed Class Modules and Classes (Educación)
  console.log(`Seeding class modules...`);

  const seedArea = async (areaData: typeof AREA_LEGAL_DATA, areaName: 'Legal' | 'Tech') => {
    for (const mod of areaData) {
      // Insert Module
      const [insertedModule] = await db.insert(classModules).values({
        area: areaName,
        title: mod.modulo,
      }).returning({ id: classModules.id });

      // Insert Classes for this Module
      for (const cls of mod.clases) {
        await db.insert(classes).values({
          moduleId: insertedModule.id,
          title: cls.titulo,
          duration: cls.duracion,
          resources: cls.recursos,
        });
      }
    }
  };

  await seedArea(AREA_LEGAL_DATA, 'Legal');
  await seedArea(AREA_TECH_DATA, 'Tech');

  // 3. Seed Prompts
  console.log(`Seeding ${PROMPT_LIBRARY.length} prompts...`);
  for (const prompt of PROMPT_LIBRARY) {
    await db.insert(prompts).values({
      topic: prompt.tema,
      tool: prompt.herramienta,
      purpose: prompt.proposito,
      promptText: prompt.prompt,
      tips: prompt.tips,
    });
  }

  console.log('Seeding completed successfully!');
  process.exit(0);
}

seed().catch(console.error);
