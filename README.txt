# The FACS 6 to 8 course website

This folder is the whole website. Plain HTML, CSS and JavaScript. No server, no
database, no login, nothing to install.

## How to open it

Double click `index.html`. It opens in your browser and every link works.

The `games` folder holds the review games. Each one is a single page with its
script inside it; they run offline and save nothing.

You can also drag `index.html` onto a browser window. If you move this folder,
move the whole folder. The pages link to each other by relative path, so they
only work when they stay together.

## How to rebuild it after you edit a markdown file

Edit any file under `03 Course Design`, `04 Units`, `05 Materials` or
`02 Standards`. Then open Terminal, go to the project folder, and run one
command:

```
python3 "_tools/build_site.py"
```

That reads every markdown file again and rewrites this whole folder: every page,
the stylesheet, the script and this README. You can run it as many times as you
like. It always starts clean. The PDF and Word files under `downloads/` come
from a second script, `python3 "_tools/build_downloads.py"`, which runs first.

To go to the project folder in Terminal, type `cd ` (with the space), drag the
`FACS Curriculum Build` folder onto the Terminal window, and press return.

## How to put it on GitHub Pages

You need a free GitHub account. Numbered steps, no git experience needed.

1. Go to github.com and sign in. If you do not have an account, click Sign up
   and make one.
2. Click the plus sign in the top right, then New repository.
3. Name it something like `facs-curriculum`. Set it to Public. Do not check any
   of the boxes for a README or a license. Click Create repository.
4. On the next page, find the line that says "uploading an existing file" and
   click it.
5. Open this `06 Website` folder on your Mac. Select everything inside it: the
   `.html` files, the `css` folder, the `js` folder, the `downloads` folder and
   this README. Drag them all into the browser window.
6. Wait for the upload to finish. The `downloads` folder holds several hundred
   small files, so give it a minute.
7. In the box that says "Commit changes", type `First upload` and click Commit
   changes.
8. Click Settings at the top of the repository, then Pages in the left sidebar.
9. Under Build and deployment, set Source to "Deploy from a branch". Set Branch
   to `main` and the folder to `/ (root)`. Click Save.
10. Wait about a minute, then reload the Pages settings screen. It shows the
    address of your site, which looks like
    `https://yourname.github.io/facs-curriculum/`. That is the link you send.

To update the site later: rebuild with the command above, then in GitHub click
Add file, then Upload files, and drag the changed files in again. Committing
replaces the old versions.

One note: upload the files that are *inside* `06 Website`, not the `06 Website`
folder itself. If you upload the folder, your address gets an extra
`/06%%20Website/` in the middle of it and still works, but it looks worse.

## What to edit to change the accent colour or the course title

Both live in `_tools/build_site.py`, at the top of the file. Edit, save, rebuild.

- **Course title.** Change `COURSE_TITLE` (the long name at the top of the home
  page) and `COURSE_SHORT` (the short name in the header and the browser tab).
- **Accent colour.** Change the numbers in `ACCENT_HUES`. Each unit has one
  number, a hue on the colour wheel from 0 to 360: 0 is red, 40 is orange, 120
  is green, 210 is blue, 280 is purple, 330 is pink. `DEFAULT_HUE` is the colour
  of the pages that do not belong to one unit, such as the home page and the
  standards map.
- If you would rather edit the stylesheet directly, `css/style.css` is plain
  CSS and the accent is a variable named `--accent` in the first block. Keep in
  mind that a rebuild overwrites that file, so a change made there is temporary.

## What is in here

- `index.html`, the home page. The course in ninety seconds.
- `syllabus.html`, `scope-and-sequence.html`, `grading.html`, `about.html`.
- `unit-NN.html`, one page per unit.
- `lesson-NN-MM.html`, one page per lesson.
- `lessons.html`, every lesson in one filterable table.
- `handout-NN-MM.html` and `slides-NN-MM.html`, one page per material.
- `materials.html`, every handout and slide outline by unit.
- `standards.html`, every standard line and the lessons that teach it.
- `css/style.css` and `js/site.js`, one of each.
- `downloads/documents/`, every public document as PDF and Word, and
  `downloads/handouts/`, the handouts with the answer key cut. The tests and
  the keys are not in this folder and never are; they sit behind the teacher
  sign in.

## Printing

Every page prints. Use the browser's print command. The navigation, the filters
and the sidebar drop out, and the content prints on letter paper with sensible
margins. Tables and lesson sections are kept from breaking across pages where
that is possible.

## Square brackets

Square brackets in the source are curriculum and they print: the fill-in blanks
on a handout, the checkbox boxes, the drawing boxes, the labels in a diagram,
and the slot words in a sentence frame a student completes. The markdown once
carried teacher notes in brackets (`[Sal: ...]`, `[update ...]`, `[check ...]`);
those were all taken out on 2026-09-15 and are listed in
`00 _admin/TEACHER NOTES LEDGER.md`. The build still knows the pattern and would
tint any such note on screen and hide it in print, as a guard, but none exist.

## No student data

There is no student information anywhere in this folder and no photographs of
students. There is no tracking and no network request of any kind beyond what
the teacher and student sign in needs. Keep it that way.
