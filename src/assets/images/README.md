# Demo photography

Every image in this directory is placeholder/demo photography sourced from
Unsplash for the AURENZA INTERIORS demo presentation. None of it depicts a
real AURENZA INTERIORS project. Replace each file (keeping the same filename and aspect ratio) with real
client photography once available. Project images (`projects/*.jpg`) are
referenced through `src/data/projects.js`, so swapping those needs no
code changes elsewhere. Every other image (hero, intro, philosophy,
process-story, materials, about, cta) is imported directly by its
component (e.g. `src/components/Hero.jsx`) — replacing those files in
place, with the same filename, is still a drop-in swap, just not via a
data file.
