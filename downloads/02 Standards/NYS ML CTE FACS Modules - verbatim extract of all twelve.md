# NYS Middle-Level CTE Family and Consumer Sciences: Standards Extract

Verbatim extraction of all twelve New York State Middle-Level CTE modules for FACS: the six FACS Content Modules and the six CTE Theme Modules. Built 2026-09-11 from the twelve PDFs in `Desktop/FNES 563/10 Reference/Standards/`, which were downloaded from nyctecenter.org on 2026-09-10. Every PDF carries the footer "June 2018, NYS Middle-level CTE, Preliminary Release for Field Review and Piloting." These are public state documents and are reproduced here line by line so the curriculum can cite them exactly.

## How to read this file

- Each module sits between a **BEGIN ... TEXT** line and an **END ... TEXT** line. Everything between those lines is the state's text.
- The state's numbering and lettering are kept exactly: topic areas are "1.", "2.", and so on; performance indicators are "a)", "b)", and so on. In the Problem Solving and Innovation theme module the state nests a second level, "a.", "b.", under some lettered lines; that is kept too.
- Cite a line as: module short name, topic area name, letter. Example: "NYS N&W Culinary Management b) Demonstrate safety and sanitation procedures when handling food and equipment."
- Beyond the performance indicators, each PDF also carries a MODULE DESCRIPTION, a GUIDING QUESTION, ILLUSTRATIVE ACTIVITIES (one per CTE theme in the content modules, one per CTE content area in the theme modules), STANDARDS ADDRESSED (CDOS, NYS FACS learning standards, Career Ready Practices, National FCS Standards, and for the theme modules the other CTE areas' national standards), and RESOURCES. All of it is included under the state's own headings.

## What was changed in the extraction, and what was not

Changed (extraction mechanics only):
- Page footers ("June 2018 / NYS Middle-level CTE / Preliminary Release for Field Review and Piloting") removed.
- Lines that wrapped in the PDF layout were rejoined into one line.
- Where the PDF text layer dropped a space between two words (for example "activitieswhen", "self-conceptand", "orhuman"), the space was restored. No wording was altered.
- One dash character in a resource blurb ("grades K to 12", printed with a dash) was written as "K-12".
- Markdown headings (###, ####) and list dashes were added for readability. The state's own labels ("1.", "a)") are still on every line.

Not changed (the state's own errors are left as printed, so a quote matches the PDF):
- HDR 3. a) reads "Define the terms “pee” and “peer pressure”" (the PDF says "pee").
- HDR topic numbering runs 1, 2, 3, 4, 5, 7, 8. There is no topic 6 in the PDF.
- HDR Mindfulness Journal activity ends "share and discuss with the with class."
- EDM 1. b) reads "Plan ways of maintaining Identify common safety hazards..." Two phrases are fused in the PDF.
- N&W National FCS line 14.4.4 ends mid-sentence at "protect the health of". Marked with a bracketed note.
- IGLR Sustainability activity title is "Preserving Natural Resources in Leisure Activiites."
- IGLR CDOS header reads "New York State Career Development and Occupational Standards (CDOS)" (the word "Studies" is missing in that one PDF).
- Several PDFs print "Standards 3a" instead of "Standard 3a" (HDR, Apparel, EDM).
- Career Ready Practice 2 is printed as "Apply appropriate and academic and technical skills" in most PDFs and "Apply appropriate academic and technical skills" in N&W.
- The theme heading inside the content modules' activity lists is sometimes "Career and Community Opportunities" (IGLR, EDM, N&W) and sometimes "Career and Community Connections" (HDR, Apparel, FSP). The theme module's own title is "Career and Community Opportunities" but its MODULE CONTENT line reads "Career and Community Connections." Use "Career and Community Opportunities" as the official theme name.
- In N&W the activity heading for the second theme is just "Communication."
- Theme 01 NBEA URL is malformed in the PDF ("https://www.nbea/newsite/...").
- Theme 02 ITEEA line H says "transfered"; Theme 06 ITEEA line G says "influence by"; Theme 06 1. c) says "give example."
- Theme 03 1. f) reads "Understand that national and global economic factors that may impact personal income."
- Theme 05 4. b) c. reads "Evaluating the value of the of research sources."
- Theme 05 NBEA Computation list has two items labeled "V."
- Theme 04 and 05 and 06 print "Common Core Technical Core Standards" in the Note line; Theme 02 and 03 print "Common Career Technical Core Standards."

## Shape of the twelve modules (for the crosswalk builder)

Counts are of the state's numbered topic areas and lettered performance indicators under MODULE CONTENT. "Sub-lines" are the second-level "a., b., c." items that only the Problem Solving module uses.

| Module | Topic areas | Lettered lines | Sub-lines |
|---|---|---|---|
| Content 01 Individual Growth and Life Readiness | 5 | 20 | 0 |
| Content 02 Human Development and Relationships | 7 (numbered 1 to 5, 7, 8) | 28 | 0 |
| Content 03 Apparel and Textile Production and Design | 5 | 19 | 0 |
| Content 04 Environmental Design and Management | 4 | 14 | 0 |
| Content 05 Nutrition and Wellness | 4 | 18 | 0 |
| Content 06 Food Systems and Production | 6 | 25 | 0 |
| Theme 01 Career and Community Opportunities | 7 | 24 | 0 |
| Theme 02 Communication and Interpersonal Relationships | 7 | 36 | 0 |
| Theme 03 Financial and Consumer Literacy | 6 | 35 | 0 |
| Theme 04 Health, Safety, and Wellness | 7 | 40 | 0 |
| Theme 05 Problem Solving and Innovation | 5 | 16 | 26 |
| Theme 06 Sustainability | 4 | 30 | 0 |
| Totals | 67 | 305 | 26 |

Topic-area headings by module:

- IGLR: 1. Personal Development; 2. Goal Setting; 3. Employability; 4. Financial Readiness; 5. Career Pathways.
- HDR: 1. Human Growth and Development Across the Lifespan; 2. Self-Concept and Self-Image; 3. Peer Influence and Stress Management; 4. Human Relationships; 5. Family Role in Society; 7. Parenting; 8. Career Pathways.
- Apparel: 1. Selection; 2. Production; 3. Maintenance; 4. Consumer Resources and Finance; 5. Career Pathways.
- EDM: 1. Healthy, Safe, Sustainable Living Spaces; 2. Environment and Interior Design; 3. Consumer Resources and Finance; 4. Career Pathways.
- N&W: 1. Culinary Management; 2. Nutrition Across the Lifespan; 3. Consumer Resources and Finance; 4. Career Pathways.
- FSP: 1. Basic Culinary Skills; 2. Food Preparation; 3. Current Issues Related to Food in Global Societies; 4. Future of Food in a Global Society; 5. Consumer Resources and Finance; 6. Career Pathways.
- Theme CCO: 1. The Work World; 2. Career Clusters; 3. Employability Skills; 4. Career Plans; 5. Community Needs Assessment; 6. Participation in Community Activities; 7. Career Pathways.
- Theme CIR: 1. Communication; 2. Listening; 3. Workplace Communication; 4. Relationships; 5. Peer Relationships; 6. Conflict Prevention and Management; 7. Careers in the Communication and Human Services Field.
- Theme FCL: 1. Earning Income; 2. Saving, Investing, and Sharing; 3. Protecting and Insuring; 4. Buying Goods and Services; 5. Payment Options and Credit; 6. Careers in Financial and Consumer Services.
- Theme HSW: 1. Health Practices; 2. Disease Prevention; 3. Personal Safety; 4. Classroom and Workplace Safety; 5. Social-Emotional Learning; 6. Stress Management; 7. Careers in Health, Safety, and Wellness Fields.
- Theme PSI: 1. Problem Solving; 2. Design Process (Proactive); 3. Troubleshooting Process (Reactive); 4. Research Applications in CTE; 5. Careers in Problem Solving, Invention, and Innovation.
- Theme SUS: 1. Resources; 2. Environmental Management; 3. Energy Conservation; 4. Careers Related to Sustainability.

## The three NYS FACS learning standards and the CDOS standards, as printed in the module PDFs

These lines appear under STANDARDS ADDRESSED in the module PDFs. They are the intermediate-level statements. Which of the three FACS standards each content module cites:

| Content module | NYS FACS Standard 1 Personal Health and Fitness | Standard 2 Safe and Healthy Environment | Standard 3 Resource Management |
|---|---|---|---|
| IGLR | no | yes | yes |
| HDR | no | yes | no |
| Apparel | no | yes | no |
| EDM | no | yes | yes |
| N&W | yes | yes | yes |
| FSP | yes | yes | yes |

NYS Learning Standards for Family and Consumer Sciences, Intermediate Level (wording as printed in the N&W and FSP PDFs):
- Standard 1: Personal Health and Fitness. Students will have the necessary knowledge and skills to establish and maintain physical fitness, participate in physical activity, and maintain personal health.
- Standard 2: Safe and Healthy Environment. Students will acquire the knowledge and ability necessary to create and maintain a safe and healthy environment.
- Standard 3: Resource Management. Students will understand and be able to manage their personal and community resources. (EDM prints "understand and can manage.")

New York State Career Development and Occupational Studies (CDOS) Standards, Intermediate Level (cited by all twelve modules):
- Standard 1: Career Development. Students will be knowledgeable about the world of work, explore career options, and relate personal skills, aptitudes, and abilities to future career decisions.
- Standard 2: Integrated Learning. Students will demonstrate how academic knowledge and skills are applied in the workplace and other settings.
- Standard 3a: Universal Foundation Skills. Students will demonstrate mastery of the foundation skills and competencies essential for success in the workplace.

Common Career Technical Core, Career Ready Practices, the full list of twelve as it can be assembled from the PDFs (no single PDF prints all twelve):
1. Act as a responsible and contributing citizen and employee
2. Apply appropriate academic and technical skills
3. Attend to personal health and financial well-being
4. Communicate clearly and effectively and with reason
5. Consider environmental, social, and economic impacts of decisions
6. Demonstrate creativity and innovation
7. Employ valid and reliable research strategies
8. Utilize critical thinking to make sense of problems and persevere in solving them
9. Model integrity, ethical leadership, and effective management
10. Plan education and career paths aligned to personal goals
11. Use technology to enhance productivity
12. Work productively in teams while using cultural global competence

Career Ready Practices cited by each content module: IGLR 1, 3, 4, 8, 9, 10, 11. HDR 3, 4, 5, 9, 12. Apparel 1, 2, 3, 5, 6, 11, 12. EDM 2, 3, 5, 6, 7, 8, 10. N&W 1, 2, 3, 5, 7, 8, 10, 11, 12. FSP 2, 4, 5, 6, 7, 8, 9, 12.

## The CTE Middle Level FACS Grid (Week 02 handout)

Source: `02 Course Materials/Week 02/Week 02 - CTE Middle Level FACS Grid.docx`. The header reads "New York State CTE Middle Level Instruction in Family & Consumer Sciences" and lists two resource links: http://nyctecenter.org/instruction/middle-level-cte and http://nyctecenter.org/instruction/life-career-abilities. The document is the professor's one-page handout. It reproduces the state's organizing grid and adds four stock classroom photos and the caption "Teach Meaningful Middle-level CTE-FACS Learning Experiences that align with CTE Theme Modules." Because the grid itself is the state's structure (the same grid appears on slide 7 of the FACS Curriculum deck and on nyctecenter.org), the structure is given here; the photos and layout are hers.

Grid structure: rows are the three FACS Learning Strands, each holding two FACS Content Modules; columns are the six CTE Theme Modules. Every content module is meant to be taught against all six themes.

| FACS Learning Strand | FACS Content Module |
|---|---|
| Food and Nutrition | Nutrition & Wellness |
| Food and Nutrition | Food Systems and Production |
| Human Services and Family Studies | Human Development & Relationships |
| Human Services and Family Studies | Individual Growth & Life Readiness |
| Textiles and Design | Apparel and Textile Production & Design |
| Textiles and Design | Environmental Design & Management |

Columns (CTE Theme Modules): Career & Community Opportunities; Communication & Interpersonal Relationships; Financial & Consumer Literacy; Health, Safety & Wellness; Problem Solving & Innovation; Sustainability.

## Middle-level CTE requirement (from nyctecenter.org, as recorded in the 2026-09-10 markdown pull)

All middle-level students are entitled to 1 3/4 units of CTE; instruction can begin as early as grade 5 and can be delivered in any CTE content area. Theme modules are described by the state as foundational, cross-content, and standards-based, teachable by a teacher certified in any CTE area; content modules supply the context for the themes.

# THE TWELVE MODULES, VERBATIM


## CONTENT MODULE: Individual Growth and Life Readiness

**BEGIN CONTENT MODULE TEXT: Individual Growth and Life Readiness**
Source file: `10 Reference/Standards/NYS ML CTE FACS Content Module 01 - Individual Growth and Life Readiness.pdf` (NYS Middle-level CTE, June 2018, Preliminary Release for Field Review and Piloting; downloaded from nyctecenter.org). Page footers removed; wrapped lines rejoined; nothing else changed.

**CTE CONTENT AREA: Family and Consumer Sciences**  
**CONTENT MODULE TITLE: Individual Growth and Life Readiness**  

### MODULE DESCRIPTION

This module introduces students to the ways in which understanding self impacts lifelong choices. Students will explore, identify, and assess personal traits, interests, and abilities relative to becoming a contributing member of home, school, community, and work environments. Students will identify and analyze basic money management concepts. Students will have the opportunity to explore the wide variety of career options related to personal self-discovery and identify the knowledge, skills, education, and training necessary for success within a variety of fields.

### GUIDING QUESTION

What knowledge and skills are necessary to demonstrate introductory understanding of self, interests, aptitudes, and abilities as they relate to personal development, employability, and financial readiness?

### MODULE CONTENT

*Individual Growth and Life Readiness*

#### 1. Personal Development
Students will
- a) Examine personal values
- b) Discover and evaluate personality traits and strengths
- c) Predict areas of personal interests relating to the future

#### 2. Goal Setting
Students will
- a) Acknowledge the role of personal values and standards in goal setting
- b) Differentiate between SMART and Stretch goals
- c) Establish a goal for personal improvement
- d) Design, implement, and evaluate a plan to attain a desired goal

#### 3. Employability
Students will
- a) Explore employability skills
- b) Show understanding of interpersonal dynamics
- c) Demonstrate effective communication skills
- d) Explore and implement strategies for career readiness

#### 4. Financial Readiness
Students will
- a) Identify sources of income
- b) Create and follow a budget
- c) Explore options for money transfers
- d) Examine how to balance a bank account
- e) Determine ways for saving money
- f) Compare and contrast different types of credit and loans
- g) Evaluate the impact of various family transitions on personal finance

#### 5. Career Pathways
Students will
- a) Explore various careers within the 16 national career clusters
- b) Examine the skills needed to become an entrepreneur

### ILLUSTRATIVE ACTIVITIES by Theme Module

Career and Community Opportunities
Discovering Personal Traits
Students discover and evaluate personal traits using a variety of tools approved by their school communities, such as values inventories, strengths inventories, personality assessments, and job skills inventories. Students will use the information gathered from these activities when practicing employment activities, such as creating a resume, identifying references, creating a targeted cover letter, filling out a job application, preparing for a job interview, and sending follow-up communication.

Communication and Interpersonal Relationships
Interview an Adult
Students make arrangements to interview an adult in a career field of interest to them. Prior to their interviews, students work in pairs to practice effective communication skills to use during the student/adult interview, including observing and practicing effective non-verbal communication skills; reading questions aloud using different tones and inflections; and role playing active/reflective listening.

Financial and Consumer Literacy
Savings Options
Students create a short-term financial savings goal for a specific item or purpose. Invite a panel of representatives from a variety of local financial institutions to present information on savings products available from their institutions. Following the presentation, students decide which product they would choose to help them reach their savings goals and present their choice and reasons to the class.

Health, Safety, and Wellness
3-D Personal Timelines
Students make 3-D personal timelines illustrating where they have been, where they are now, and where they are going, including the goals they would like to achieve in their lifetime. Students will imagine, describe, and represent the lifestyle they would like to experience, including their physical, emotional, social and academic goals. Timelines will show the steps necessary to achieve these goals.

Problem Solving and Innovation
Entrepreneurship
After students view interviews with entrepreneurs, such as through Khan Academy, students create lists of traits or characteristics common to successful entrepreneurs. Small groups develop entrepreneurship plans and make prototype food, textile, or human services products. Groups pitch their ideas to a panel representing potential investors. Classmates and investors vote on which entrepreneurs to back.

Sustainability
Preserving Natural Resources in Leisure Activiites
Students will identify a leisure activity or hobby that they do now or would like to include in their future lifestyle. Make a list of the resources used to engage in this activity. Research ways the activity could be amended to preserve natural resources or to make a lesser impact on the environment, for example installing a solar heating cover on a swimming pool or converting a swimming pool to salt water. Students will share ideas with the class.

### STANDARDS ADDRESSED

New York State Career Development and Occupational Standards (CDOS)
Intermediate Level
http://www.p12.nysed.gov/cte/
Standard 1: Career Development
Students will be knowledgeable about the world of work, explore career options, and relate personal skills, aptitudes, and abilities to future career decisions.
Standard 2: Integrated Learning
Students will demonstrate how academic knowledge and skills are applied in the workplace and other settings.
Standard 3a: Universal Foundation Skills
Students will demonstrate mastery of the foundation skills and competencies essential for success in the workplace.

NYS Learning Standards for Family and Consumer Sciences
Intermediate Level
http://www.p12.nysed.gov/cte/
Standard 2: Safe and Healthy Environment
Students will acquire the knowledge and ability necessary to create and maintain a safe and healthy environment
Standard 3: Resource Management
Students will understand and be able to manage their personal and community resources

Common Career Technical Core Standards
https://www.careertech.org/career-ready-practices
Career Ready Practices
1. Act as a responsible and contributing citizen and employee
3. Attend to personal health and financial well-being
4. Communicate clearly and effectively and with reason
8. Utilize critical thinking to make sense of problems and persevere in solving them
9. Model integrity, ethical leadership, and effective management
10. Plan education and career paths aligned to personal goals
11. Use technology to enhance productivity

National Family and Consumer Sciences Standards
http://www.nasafacs.org/national-standards-and-competencies.html
1.0 Career, Community and Family Connections
Integrate multiple life roles and responsibilities in family, work, and community settings
1.2.1 Analyze potential career choices to determine the knowledge, skills, attitudes, and opportunities associated with each career
1.2.2 Demonstrate job seeking and job keeping skills
1.2.3 Apply communication skills in school, community, and workplace settings
1.2.4 Demonstrate teamwork skills in school, community, and workplace settings
1.2.8 Demonstrate employability skills, work ethics, and professionalism
2.0 Consumer and Family Resources
Evaluate management practices related to the human, economic, and environmental resources in a global context
2.1.1 Apply time management, organizational, and process skills to prioritize tasks and achieve goals
2.1.2 Analyze how individuals and families make choices to satisfy needs and wants
2.1.7 Apply consumer skills to decisions about recreation
2.4.3 Assess the use of technology and its effect on quality of life
2.5.1 Analyze the use of resources in making choices that satisfy needs and wants of individuals, families, and communities
2.5.3 Analyze economic effects of laws and regulations that pertain to consumers and providers of services
2.6.1 Evaluate the need for personal and family financial planning
2.6.2 Apply financial management principles to individual and family financial practices
2.7.2 Analyze how education, income, career, and life choices relate to achieving financial goals
2.7.3 Manage money effectively by developing financial goals and budgets
2.7.4 Manage credit and debt to remain both creditworthy and financially secure
12.0 Human Development
Analyze factors that influence human growth and development
12.1.1 Analyze physical, emotional, social, moral, and cognitive development
12.2.4 Analyze the influence of life events on individuals’ physical, emotional, social, moral, and cognitive development
13.0 Interpersonal Relationships
Demonstrate respectful and caring relationships in the family, workplace and community
13.1.1 Analyze processes for building and maintaining interpersonal relationships
13.2.1 Analyze the effects of personal characteristics on relationships
13.3.1 Analyze communication styles and their effects on relationships
13.3.2 Demonstrate verbal and nonverbal behaviors and attitudes that contribute to effective communication
13.3.3 Demonstrate effective listening and feedback techniques

### RESOURCES

New York State Department of Labor
New York State Career Zone
https://www.careerzone.ny.gov
Career Zone is a no-cost online career exploration and planning tool developed by the New York State Department of Labor. It offers career and education information on thousands of careers, as well as, self-assessment and career planning tools. Career Zone is appropriate for users from middle school through adult.

United States Department of Labor
CareerOneStop
https://www.careeronestop.org
CareerOneStop is the career, training, and job search website for the U.S. Department of Labor. The website serves job seekers, businesses, students, and career advisors with a variety of free online tools, information, and resources.

California Department of Education
https://www.cde.ca.gov/eo/in/fl/finlitk12.asp
This site offers an electronic resource library for grades K-12 providing links to programs that are appropriate for use in the classroom or at home as a resource for students, teachers, and parents who want to increase financial literacy

CAREER Wise Education
https://careerwise.minnstate.edu/careers/assessmentsuite.html
Career Wise Education offers a suite of career inventories and assessments that help students identify interests and skills and match them to careers. For example, the Interest Assessment shows an individual interest profile and connects that profile to specific careers and majors. Short and long format assessments are available.

National Education Association (NEA)
Resources for Teaching Financial Literacy
http://www.nea.org/tools/lessons/resources-for-teaching-financial-literacy.html
This website provides resources to supplement curriculum and help students gain the financial literacy skills they’ll need to manage their financial resources effectively throughout their lives.

Association of Career and Technical Education
Career Planning Guide
https://www.acteonline.org/wp-content/uploads/2018/02/ACTE_CC_Paper_FINAL.pdf
Research has identified middle school as a time when students can benefit the most from career exploration, a process of building self-awareness, learning about potential careers, and developing a plan for reaching future goals.

AdvanceCTE
Middle Level Career Interest Inventory

https://cte.careertech.org/sites/default/files/StudentInterestSurvey-English.pdf
This website provides a Career Interest inventory worksheet to use with students in helping them identify the potential matches to the 16 career clusters available to them.

Association of CTE Administrators (ACTEA)
CTE Strong Videos
http://www.ctestrong.com
Edge Factor has created a series of inspirational videos related to Career and Technical Education that provide students with a very contemporary perspective on CTE options. Career Cluster videos provide a new look at the many career options that students have in high school and beyond.

Career and Technical Education Technical Assistance Center of New York (CTE TAC)
http://nyctecenter.org/
The Career and Technical Education Technical Assistance Center (CTE TAC) operates under a state contract to assist the New York State Education Department (NYSED) in carrying out its mission of improving the quality, access, and delivery of career and technical education through research-based methods and strategies resulting in broader CTE opportunities for all students.

New York State Association of Family and Consumer Sciences Educators (NYSAFCSE)
http://www.nysafcse.org/
Family and Consumer Sciences education in New York state is delivered through a variety of courses designed to promote student attainment of the intermediate and commencement level New York State Learning Standards for Family and Consumer Sciences (FACS) and Career Development and Occupational Studies (CDOS). This professional organization hosts a website that includes "Curriculum" and a "Best Practices" tabs.


**END CONTENT MODULE TEXT: Individual Growth and Life Readiness**



## CONTENT MODULE: Human Development and Relationships

**BEGIN CONTENT MODULE TEXT: Human Development and Relationships**
Source file: `10 Reference/Standards/NYS ML CTE FACS Content Module 02 - Human Development and Relationships.pdf` (NYS Middle-level CTE, June 2018, Preliminary Release for Field Review and Piloting; downloaded from nyctecenter.org). Page footers removed; wrapped lines rejoined; nothing else changed.

**CTE CONTENT AREA: Family and Consumer Sciences**  
**CONTENT MODULE TITLE: Human Development and Relationships**  

### MODULE DESCRIPTION

This module introduces students to the many facets of human development and relationships. Students will be able to describe social, emotional, physical, and intellectual development across the lifespan. Students will learn strategies for cultivating positive human relationships through the lens of the family. They will explore the role of family as a major personal and environmental influence even as structural patterns evolve. Students will identify characteristics of healthy families. They will examine parenting roles, learn to appreciate family diversity, and identify family support systems. They will learn to recognize personal strengths and interests while developing strategies for making decisions and adapting to challenges. Students will have the opportunity to explore the wide variety of career options related to both human development and human services. Students will identify the knowledge, skills, education, and training necessary for success within these fields.

### GUIDING QUESTIONS

How do positive individual and family relationships across the lifespan help human beings develop and thrive? What impact does the family have on the well-being of individuals and society?

### MODULE CONTENT

*Human Development and Relationships*

#### 1. Human Growth and Development Across the Lifespan
Students will
- a) Identify the stages of human growth and development across the lifespan
- b) Identify the relationships among and characteristics of the physical, emotional, social, and intellectual aspects of human growth and development
- c) Demonstrate understanding of procedures required for the care of an infant or young child
- d) Plan and implement experiences for young children which promote physical, social, emotional, and intellectual growth and development

#### 2. Self-Concept and Self-Image
Students will
- a) Define the term self-concept and identify factors which affect the formation of self-concept
- b) Compare characteristics of a positive and a negative self-concept
- c) Identify ways that an individual’s self-concept changes
- d) Describe ways personal image is projected to others through physical appearance, verbal and nonverbal communication, behavior, and action
- e) Assess the impact of first impressions on the development of relationships in social and work settings

#### 3. Peer Influence and Stress Management
Students will
- a) Define the terms “pee” and “peer pressure”
- b) Compare the influence of family, peers, media, and others on decision-making
- c) Analyze positive and negative aspects of peer pressure and ways to assert individual choices within a peer group
- d) Recognize that adolescents experience common problems
- e) Identify the causes of stress and examine appropriate ways to manage stressors

#### 4. Human Relationships
Students will
- a) Identify characteristics of healthy human relationships
- b) Identify characteristics of unhealthy human relationships
- c) Discuss strategies for strengthening human relationships

#### 5. Family Role in Society
Students will
- a) Evaluate the significance of family and its impact on the well-being of individuals and society
- b) Examine “family” as the basic unit of society
- c) Investigate family structures and transitions
- d) Examine the role of the family in teaching cultural traditions and understanding of cultural diversity
- e) Discuss ways family influence can nurture or impede the development of an adolescent’s self-concept, personality, and emerging independence
- f) Identify support groups, agencies, and community organizations which assist the family in carrying out its basic functions

#### 7. Parenting
Students will
- a) Evaluate the impact of parenting roles and responsibilities on strengthening the well-being of individuals and families
- b) Identify roles and responsibilities of parenting
- c) Analyze physical, social, and emotional factors related to readiness for parenting

#### 8. Career Pathways
Students will
- a) Investigate a career in human development or human services field and identify the pathways used to reach that career
- b) Assess personal knowledge, skills, and interest in careers in human development and human services and evaluate personal suitability for these careers

### ILLUSTRATIVE ACTIVITIES by Theme Module

Career and Community Connections

Activities for Afterschool Program
Small groups of students create developmentally appropriate activity plans for an elementary afterschool program. Students assist in the afterschool program through the presentation of their activity. Students discern the types of development their activity was designed to promote in the younger students and evaluate the results.

Communication and Interpersonal Relationships
Healthy and Unhealthy Relationships
Students view video clips displaying characteristics of unhealthy human relationships such as: criticism, contempt, defensiveness, stonewalling, and dishonesty. Students brainstorm strategies that might strengthen the relationship depicted in the video, such as: “I” statements, appreciation, gratitude, seeking understanding, and taking responsibility. Students recreate the video clips showing characteristics of healthy human relationships such as: respect, boundaries, accountability, integrity, compromise, problem-solving, and generosity.

Financial and Consumer Literacy
Family Budget
Provide students with a monthly budget for a family with young children who are moving into the community. Have students research childcare options available and the costs and features of each. Students present findings on local childcare providers and discuss strategies for including childcare in the family budget and adjust the monthly budget to account for typical local childcare costs.

Health, Safety, and Wellness
Mindfulness Journal
Students learn and practice mindfulness exercises in class. Challenge students to implement mindfulness in their other classes, or whenever they face a stressor. Have students keep a mindfulness journal with responses to various prompts about stress, peer pressure, gratitude, and mindset. Students select two entries to share and discuss with the with class.

Problem Solving and Innovation
Prototype Toys
Set up a display of children's toys in the classroom. Have students identify safety hazards and toys that are inappropriate for a particular developmental stage. Small groups of students will design and create prototypes of toys that correct the safety or developmental issues associated with toys from the original display. Have students test the prototypes with children.

Sustainability
Mischel's Marshmallow Experiment
Introduce students to the Stanford marshmallow (Mischel) test by replicating the experiment in class. Lead a discussion on the struggles students, and most humans, have with delaying gratification. Provide students with short articles on current social and environmental issues which require long-term solutions. Ask students to describe how the concept of delayed gratification impacts sustainable solutions for these issues.

### STANDARDS ADDRESSED

New York State Career Development and Occupational Studies (CDOS) Standards
Intermediate Level
http://www.p12.nysed.gov/cte/
Standard 1: Career Development
Students will be knowledgeable about the world of work, explore career options, and relate personal skills, aptitudes, and abilities to future career decisions
Standard 2: Integrated Learning
Students will demonstrate how academic knowledge and skills are applied in the workplace and other settings
Standards 3a: Universal Foundation Skills
Students will demonstrate mastery of the foundation skills and competencies essential for success in the workplace

NYS Learning Standards for Family and Consumer Sciences
Intermediate Level
http://www.p12.nysed.gov/cte/
Standard 2: Safe and Healthy Environment
Students will acquire the knowledge and ability necessary to create and maintain a safe and healthy environment

Common Career Technical Core Standards
https://www.careertech.org/career-ready-practices
Career Ready Practices
3. Attend to personal health and financial well-being
4. Communicate clearly and effectively and with reason
5. Consider environmental, social, and economic impacts of decisions
9. Model integrity, ethical leadership, and effective management
12. Work productively in teams while using cultural global competence

Cluster Standards
Human Services Career Cluster®
2. Evaluate the role of the family, community, and human services in society and the economy
5. Evaluate career opportunities in each of the Human Services Career Pathways
6. Explain how human development principles enhance the well-being of individuals and families

Early Childhood Development and Services Career Pathway
1. Demonstrate communication techniques with children to facilitate ongoing development and enhance learning
2. Communicate effectively with fellow staff members to facilitate child development activities
7. Apply principles of child growth and development, including social, emotional, physical, and cognitive milestones to provide comprehensive program offerings
8. Evaluate curriculum for inclusiveness of children with special needs

Family and Community Services Career Pathway
2. Identify community resources to provide family and community services

National Family and Consumer Sciences Standards
https://www.nasafacs.org/national-standards-and-competencies.html
6.0 Family
Evaluate the significance of family and its effects on the well-being of individuals and society.
6.1 Analyze the effects of family as a system on individuals and society
6.2 Evaluate the effects of diverse perspectives, needs, and characteristics of individuals and families
15.0 Parenting
Evaluate the effects of parenting roles and responsibilities on strengthening the well-being of individuals and families
15.1 Analyze roles and responsibilities of parenting
15.2 Evaluate parenting practices that maximize human growth and development

### RESOURCES

US Department of Health and Human Services
Administration for Children and Families
https://www.acf.hhs.gov/
The Administration for Children and Families (ACF) is a division of the Department of Health and Human Services. ACF promotes the economic and social well-being of children, families, individuals and communities with leadership and resources for compassionate, effective delivery of human services. ACF’s Office of Planning, Research and Evaluation studies ACF programs and the populations they serve through rigorous research and evaluation projects.

U.S. Cooperative Extension System
http://articles.extension.org/parenting
http://articles.extension.org/family_caregiving
The U.S. Cooperative Extension System’s mission is to address issues of importance to the nation through fostering creativity and innovation in developing solutions and methods of work and advancing the visible and measurable impact of their work for the public good.

American Academy of Pediatrics
https://www.healthychildren.org/English/Pages/default.aspx
This website includes research-driven links about wide-ranging topics such as Ages and Stages, Healthy Living, Safety and Prevention, Family Life, and Health issues.

New York State Office of Mental Health

https://www.omh.ny.gov/omhweb/childservice/
The Office of Mental Health (OMH) regulates, certifies and oversees more than 4,500 programs, which are operated by local governments and nonprofit agencies. These programs include various inpatient and outpatient programs, emergency, community support, residential and family care programs.

CharacterLab
https://www.characterlab.org
Evidence shows that character strengths are as important as IQ and socioeconomic status to achievement and well-being. Although character strengths are malleable, surprisingly little is known about how they can be intentionally cultivated. Character Lab exists to research and create new ways to help all students develop character.

Association of Career and Technical Education
Career Planning Guide
https://www.acteonline.org/wp-content/uploads/2018/02/ACTE_CC_Paper_FINAL.pdf
Research has identified middle school as a time when students can benefit the most from career exploration, a process of building self-awareness, learning about potential careers, and developing a plan for reaching future goals.

AdvanceCTE
Middle Level Career Interest Inventory
https://cte.careertech.org/sites/default/files/StudentInterestSurvey-English.pdf
Provides a Career Interest inventory worksheet to use with students in helping them identify the potential matches to the sixteen career clusters available to them.

Association of CTE Administrators (ACTEA)
CTE Strong Videos
http://www.ctestrong.com
Edge Factor has created a series of inspirational videos related to Career and Technical Education that provide students with a very contemporary perspective on CTE options. Career Cluster videos provide a new look at the many career options that students have in high school and beyond.

New York State Association of Family and Consumer Sciences Educators (NYSAFCSE)
http://www.nysafcse.org/
Family and Consumer Sciences education in New York State is delivered through a variety of courses designed to promote student attainment of the intermediate and commencement level New York State Learning Standards for Family and Consumer Sciences (FACS) and Career Development and Occupational Studies (CDOS). This professional organization hosts a website that includes "Curriculum" and a "Best Practices" tabs.

Career and Technical Education Technical Assistance Center of New York (CTE TAC)
http://nyctecenter.org/
The Career and Technical Education Technical Assistance Center (CTE TAC) operates under a state contract to assist the New York State Education Department (NYSED) in carrying out its mission of improving the quality, access, and delivery of career and technical education through research-based methods and strategies resulting in broader CTE opportunities for all students.


**END CONTENT MODULE TEXT: Human Development and Relationships**



## CONTENT MODULE: Apparel and Textile Production and Design

**BEGIN CONTENT MODULE TEXT: Apparel and Textile Production and Design**
Source file: `10 Reference/Standards/NYS ML CTE FACS Content Module 03 - Apparel and Textile Production and Design.pdf` (NYS Middle-level CTE, June 2018, Preliminary Release for Field Review and Piloting; downloaded from nyctecenter.org). Page footers removed; wrapped lines rejoined; nothing else changed.

**CTE CONTENT AREA: Family and Consumer Sciences**  
**CONTENT MODULE TITLE: Apparel and Textile Production and Design**  

### MODULE DESCRIPTION

This module introduces students to the ways in which needs, wants, cultures, traditions, and situations impact apparel and textile decisions. Through hands-on experiences, students will develop skills for the selection, construction, care, and repair of clothing and accessory items. Students will explore how clothing communicates personal style and identify appropriate clothing items for roles in various settings. Students will have the opportunity to explore the wide variety of career options related to apparel and textiles and identify the knowledge, skills, education, and training necessary for success within these fields.

### GUIDING QUESTION

What knowledge and skills are necessary for selecting, purchasing, creating, and maintaining apparel and textiles for a variety of activities and settings?

### MODULE CONTENT

*Apparel and Textiles*

#### 1. Selection
Students will
- a) Determine personal needs, wants, and values
- b) Identify appropriate clothing for individual roles and activities
- c) Describe ways personal image and style is projected to others through clothing choices
- d) Inventory personal wardrobe, noting condition and appropriateness of apparel items
- e) Select wardrobe items based on personal clothing values and available resources
- f) Select appropriate clothing for a variety of situations without exceeding financial and other resources

#### 2. Production
Students will
- a) Identify common equipment and supplies used in hand and machine sewing
- b) Demonstrate safe use and storage of equipment used in hand and machine sewing
- c) Demonstrate basic hand and machine sewing techniques by creating or repairing a textile product
- d) Develop sustainability practices for repurposing apparel items

#### 3. Maintenance
Students will
- a) Identify care procedures which may extend the wear of an apparel item

- b) Use care label information to select appropriate procedures for care of clothing and accessories
- c) Identify daily, weekly, and seasonal care of clothing and accessories

#### 4. Consumer Resources and Finance
Students will
- a) Compare and contrast the cost of constructing an apparel item versus purchasing one or repurposing one
- b) Compare cost of similar apparel items when obtained from a variety of different types of vendors
- c) Create a clothing budget
- d) Describe ways that personal decisions regarding apparel and textile choices include a global responsibility

#### 5. Career Pathways
Students will
- a) Identify career paths in the textiles and apparel field
- b) Investigate a career in clothing or textiles and identify the pathways used to reach that career

### ILLUSTRATIVE ACTIVITIES by Theme Module

Career and Community Connections
Community Agencies
Students research agencies in the community that provide apparel and textile items to meet the needs of individuals and families. Agencies might include shelters, rescue missions, hospitals, or fire and police departments. Research the roles, responsibilities, and opportunities for paid and volunteer employees in these settings. Students investigate ways they can participate in the work of a community agency, such as by repairing, upcycling, or producing apparel items to donate.

Communication and Interpersonal Relationships
Equipment
Students work in groups of three to teach the class about the selection, use, and care of a piece of sewing equipment. Give each student a card with one piece of information: a picture of the sewing equipment; the name of the equipment; or a brief description of the use of the equipment. Students search for the other two people who have information related to their equipment. Students talk with each other and work together to figure out who their partners are and form a group. Groups conduct mini-research on their piece of equipment and present their findings to the class.

Health, Safety, and Wellness
Athletic Clothing and Protective Gear
Students discuss ways that athletic clothing and protective gear promote an individual's performance and safety in a variety of life-long physical activities. Students trace the development of clothing and gear for a particular activity. How have design, materials, and function changed over time? Students design and create a model of the next phase of athletic wear or gear for an activity of interest, detailing a design change that would advance performance or safety.

Financial and Consumer Literacy
Clothing Inventories
Using an electronic spreadsheet, students create personal clothing inventories that include the country of origin for each clothing item. As a class, create a map showing where inventoried items were made. Determine reasons that clothing comes from various parts of the world and discuss how the steps in production impact a garment's cost.

Problem Solving and Innovation
Upcycling Design Problem
Students work in pairs in roles as designers and clients. As clients, students supply an article of clothing that is no longer used. As designers, partners interview their clients to determine why the article is no longer used, the features that are undesirable, and how it could be improved for use as a new item. Designers develop a solution to upcycle the article and present the solution to their clients. Designers and clients work together until a design solution is reached. Designers create the solution for their clients and together they evaluate the result. Students reverse roles. Examples of upcycled items could include: t-shirts into bags; pillowcases into shopping bags; reusable shopping bags into storage bins; clothing items into rugs, mats, aprons, quilts, scarves, or head bands.

Sustainability
Stain Removal Comparison
Students compare and contrast the environmental costs of using commercial chemicals to remove stains on apparel and textiles with home-prepared stain removal alternatives. Conduct a stain removal laboratory. Have students create common stains on a variety of textiles. Treat the stains with home-prepared stain removal alternatives and evaluate the results. Consider the question of costs to the environment from discarding textiles when stain removal techniques are not tried or are unsuccessful.

### STANDARDS ADDRESSED

New York State Career Development and Occupational Studies (CDOS) Standards
Intermediate Level
http://www.p12.nysed.gov/cte/
Standard 1: Career Development
Students will be knowledgeable about the world of work, explore career options, and relate personal skills, aptitudes, and abilities to future career decisions
Standard 2: Integrated Learning
Students will demonstrate how academic knowledge and skills are applied in the workplace and other settings
Standards 3a: Universal Foundation Skills
Students will demonstrate mastery of the foundation skills and competencies essential for success in the workplace
NYS Learning Standards for Family and Consumer Sciences
Intermediate Level
Standard 2: Safe and Healthy Environment
Students will acquire the knowledge and ability necessary to create and maintain a safe and healthy environment

Common Career Technical Core Standards
https://www.careertech.org/career-ready-practices
Career Ready Practices
1. Act as a responsible and contributing citizen and employee
2. Apply appropriate and academic and technical skills
3. Attend to personal health and financial well-being
5. Consider environmental, social, and economic impacts of decisions
6. Demonstrate creativity and innovation
11. Use technology to enhance productivity
12. Work productively in teams while using cultural global competence

National Family and Consumer Sciences Standards
https://www.nasafacs.org/national-standards-and-competencies.html
16.0 Textiles, Fashion, and Apparel
Integrate knowledge, skills, and practices required for careers in textiles and apparel
16.1 Analyze career paths within the textile, apparel, and design industries
16.2 Evaluate textiles, fashion, and apparel products and materials and their uses in diverse settings
16.4 Demonstrate skills needed to produce, alter, or repair fashion, apparel, and textile products

### RESOURCES

The New York Public Library
Industry Guide: Apparel, Fashion, and Textiles
https://www.nypl.org/collections/nypl-recommendations/guides/fashion-apparel-textiles-industry
This site offers general information researching the Industry Fashion/Clothing Trade, including a directory of the textile manufacturers of the United States and Canada.

United States Center for Disease Control
Safe Youth Safe Schools
Safety During Sports and Physical Activities
https://www.cdc.gov/features/safeschools/index.html
This site provides information and resources for schools and families to help prevent injuries to children during sports and recreation activities at school or at home. Site includes information on personal safety equipment.

Association of Career and Technical Education
Career Planning Guide
https://www.acteonline.org/wp-content/uploads/2018/02/ACTE_CC_Paper_FINAL.pdf
Research has identified middle school as a time when students can benefit the most from career exploration, a process of building self-awareness, learning about potential careers, and developing a plan for reaching future goals.

AdvanceCTE
Middle Level Career Interest Inventory
https://cte.careertech.org/sites/default/files/StudentInterestSurvey-English.pdf
AdvanceCTE provides a Career Interest inventory worksheet to use with students in helping them identify the potential matches to the sixteen career clusters available to them.

Association of CTE Administrators (ACTEA)
CTE Strong Videos
http://www.ctestrong.com
Edge Factor has created a series of inspirational videos related to career and technical education that provide students with a very contemporary perspective on CTE options. Career Cluster videos provide a new look at the many career options that students have in high school and beyond.

New York State Association of Family and Consumer Sciences Educators (NYSAFCSE)
http://www.nysafcse.org/
Family and Consumer Sciences education in New York state is delivered through a variety of courses designed to promote student attainment of the intermediate and commencement level New York State Learning Standards for Family and Consumer Sciences (FACS) and Career Development and Occupational Studies (CDOS). This professional organization hosts a website that includes "Curriculum" and a "Best Practices" tabs.

Career and Technical Education Technical Assistance Center of New York (CTE TAC)
http://nyctecenter.org/
The Career and Technical Education Technical Assistance Center (CTE TAC) operates under a state contract to assist the New York State Education Department (NYSED) in carrying out its mission of improving the quality, access, and delivery of career and technical education through research-based methods and strategies resulting in broader CTE opportunities for all students.


**END CONTENT MODULE TEXT: Apparel and Textile Production and Design**



## CONTENT MODULE: Environmental Design and Management

**BEGIN CONTENT MODULE TEXT: Environmental Design and Management**
Source file: `10 Reference/Standards/NYS ML CTE FACS Content Module 04 - Environmental Design and Management.pdf` (NYS Middle-level CTE, June 2018, Preliminary Release for Field Review and Piloting; downloaded from nyctecenter.org). Page footers removed; wrapped lines rejoined; nothing else changed.

**CTE CONTENT AREA: Family and Consumer Sciences**  
**CONTENT MODULE TITLE: Environmental Design and Management**  

### MODULE DESCRIPTION

This module introduces students to the ways living spaces can be managed to ensure safety, conserve natural resources, and achieve personal expression. Students will address aspects of household management to include budgeting, purchasing, maintaining, and problem solving as individual and family needs change. Students will have the opportunity to explore the wide variety of career options related to environment, housing, and interior design and to identify the knowledge, skills, education, and training necessary for success within these industries.

### GUIDING QUESTION

What knowledge and skills are necessary for designing and managing living spaces to ensure safety, conserve natural resources, and achieve personal expression?

### MODULE CONTENT

*Environmental Design and Management*

#### 1. Healthy, Safe, Sustainable Living Spaces
Students will
- a) Recognize that family, school, work, and community settings are all part of the individual’s broader living space
- b) Plan ways of maintaining Identify common safety hazards found in living spaces and describe ways to minimize risks to individuals, families, and household members
- c) Formulate a safety plan for home, work, and community settings
- d) Investigate ways to conserve natural resources in family, school, work, and community settings

#### 2. Environment and Interior Design
Students will
- a) Design shared environments and living space zones (for home, school, work, and/or community) which show respect for individual privacy needs and appreciation of large group social needs
- b) Create a floor plan designed to meet the needs of individuals, families, or communities
- c) Incorporate the elements and principles of design into a design plan
- d) Research how environmental and green home factors influence the design of functional, safe and aesthetic living spaces
- e) Predict future housing design incorporating technology and demographic data

#### 3. Consumer Resources and Finance
Students will
- a) Construct a budget for implementation of a floor plan design
- b) Use consumer skills to select household items

#### 4. Career Pathways
Students will
- a) Explain roles and functions of individuals engaged in environment, housing, and interior design careers
- b) Investigate education and training requirements and opportunities for career paths in environment, housing, and interior design fields
- c) Assess personal employability skills for careers in environment, housing, architecture, and interior design and evaluate personal suitability for these careers

### ILLUSTRATIVE ACTIVITIES by Theme Module

Career and Community Opportunities
Research vs. Guest Speaker
Students research careers related to environment, housing, architecture, and interior design, noting typical tasks and working conditions, education and certification required, personality traits, technology used, salary potential, and employment outlook. Invite a guest speaker employed in one of these careers to meet with students; have students develop questions for the speaker to address. Discuss the similarities and differences between the information obtained through research and the information gained from the guest speaker.

Communication and Interpersonal Relationships
Role Play
Provide small groups of students with scenarios describing needs for different home improvements. Have student groups investigate and develop a set of important questions for homeowners to ask contractors when hiring professionals to complete a home improvement project. Role play an interview that the homeowner may have when hiring professionals to make home improvements.

Financial and Consumer Literacy
Making Rental Decisions
Have students analyze the advertisements and websites of furniture rental companies to determine a list of common fees associated with renting furniture or appliances. Students will calculate the cost of renting a specific home furnishing or appliance for a set period of time. Students will compare the costs for renting to the costs for purchasing. The class will discuss reasons, including financial considerations, that a consumer might decide to rent home furnishings or appliances.

Health, Safety, and Wellness
Floor Plan Revisions
Small groups of students develop floor plans for a public space, such as a living room or family room. Once the floor plans are complete, provide the groups with a scenario describing the family who will use the room. In each scenario, include family members who would need special considerations in floor planning (e.g., a toddler, a person using a walker or wheelchair, a person with limited vision, etc.) Students evaluate the original floor plans for safety and make recommendations for adjustments based on the scenario.

Problem Solving and Innovation
Tiny Houses
Students research the concept of tiny houses to develop a list of common features of tiny houses. In small groups, design tiny houses that incorporate the generated list of features using graph paper or design software. Participate in a gallery walk to analyze and critique designs of classmates, designating design elements they admire and proposing alternatives for areas of concern.

Sustainability
Carbon Footprint
Students learn about the concept of the carbon footprint from a variety of scholarly sources. Students stand on newsprint and outline their two feet to draw their footprints. In one footprint, students define “carbon footprint” using 20 words or less (GIST technique). In the second footprint, students write a personal goal to reduce their own “carbon footprint.” Post the outlines outside the classroom to raise awareness of this issue in others.

### STANDARDS ADDRESSED

New York State Career Development and Occupational Studies (CDOS) Standards
Intermediate Level
http://www.p12.nysed.gov/cte/
Standard 1: Career Development
Students will be knowledgeable about the world of work, explore career options, and relate personal skills, aptitudes, and abilities to future career decisions
Standard 2: Integrated Learning
Students will demonstrate how academic knowledge and skills are applied in the workplace and other settings
Standards 3a: Universal Foundation Skills
Students will demonstrate mastery of the foundation skills and competencies essential for success in the workplace

NYS Learning Standards for Family and Consumer Sciences
Intermediate Level
Standard 2: Safe and Healthy Environment
Students will acquire the knowledge and ability necessary to create and maintain a safe and healthy environment
Standard 3: Resource Management
Students will understand and can manage their personal and community resources

Common Career Technical Core Standards
Career Ready Practices https://www.careertech.org/career-ready-practices
2. Apply appropriate and academic and technical skills

3. Attend to personal health and financial well-being
5. Consider environmental, social, and economic impacts of decisions
6. Demonstrate creativity and innovation
7. Employ valid and reliable research strategies
8. Utilize critical thinking to make sense of problems and persevere in solving them
10. Plan education and career paths aligned to personal goals

National Family and Consumer Sciences Standards
https://www.nasafacs.org/national-standards-and-competencies.html
2.0 Consumer and Family Resources
Evaluate management practices related to the human, economic, and environmental resources in a global context
3.0 Consumer Services
Integrate knowledge, skills, and practices needed for careers in consumer services
11.0 Housing and Interior Design
Integrate knowledge, skills, and practices required for careers in housing and interior design
11.1 Analyze career paths within the housing, interior design, and furnishings industry
11.2 Evaluate housing and design theories and concepts, including sustainability and universal design, in relation to available resources and options
11.3 Apply interior design knowledge, skills, and processes to meet specific design needs

### RESOURCES

New York State Energy Research and Development Authority (NYSERDA)
https://www.nyserda.ny.gov/Communities-and-Governments/K-12-Schools
Healthy, Safe, Sustainable Living Spaces
Site dedicated to a K-12 initiative that provides resources to inspire students to think green. The site includes lesson plans, projects, and other resources.

US Department of Homeland Security
https://www.ready.gov/make-a-plan
Knowledge Empowers!
Site offers materials to teach what to do before, during, and after an emergency using skills such as problem-solving, teamwork, creativity, leadership and communication.

US Energy Information Administration
Energy Kids
https://www.eia.gov/kids/
Site offers energy-related stories, hands-on activities, and research articles for the classroom. Options are offered to explore environmental issues and how they relate to home living decisions.

The College Board
Create Your Roadmap: Environment and Interior Design
https://bigfuture.collegeboard.org/careers/arts-visualand-performing-interior-designers

This interactive college and career planning website provides details on several career pathways related to interior design. Educational requirements are included on this site.

Association of Career and Technical Education
Career Planning Guide
https://www.acteonline.org/wp-content/uploads/2018/02/ACTE_CC_Paper_FINAL.pdf
Research has identified middle school as a time when students can benefit the most from career exploration, a process of building self-awareness, learning about potential careers, and developing a plan for reaching future goals.

AdvanceCTE
Middle Level Career Interest Inventory
https://cte.careertech.org/sites/default/files/StudentInterestSurvey-English.pdf
AdvanceCTE provides a Career Interest inventory worksheet to use with students in helping them identify the potential matches to the sixteen career clusters available to them.

Association of CTE Administrators (ACTEA)
CTE Strong Videos
http://www.ctestrong.com
Edge Factor has created a series of inspirational videos related to Career and Education that provide students with a very contemporary perspective on CTE options. Career Cluster videos provide a new look at the many career options that students have in high school and beyond.

New York State Association of Family and Consumer Sciences Educators (NYSAFCSE)
http://www.nysafcse.org/
Family and Consumer Sciences education in New York state is delivered through a variety of courses designed to promote student attainment of the intermediate and commencement level New York State Learning Standards for Family and Consumer Sciences (FACS) and Career Development and Occupational Studies (CDOS). This professional organization hosts a website that includes "Curriculum" and a "Best Practices" tabs.

Career and Technical Education Technical Assistance Center of New York (CTE TAC)
http://nyctecenter.org/
The Career and Technical Education Technical Assistance Center (CTE TAC) operates under a state contract to assist the New York State Education Department (NYSED) in carrying out its mission of improving the quality, access, and delivery of career and technical education through research-based methods and strategies resulting in broader CTE opportunities for all students.


**END CONTENT MODULE TEXT: Environmental Design and Management**



## CONTENT MODULE: Nutrition and Wellness

**BEGIN CONTENT MODULE TEXT: Nutrition and Wellness**
Source file: `10 Reference/Standards/NYS ML CTE FACS Content Module 05 - Nutrition and Wellness.pdf` (NYS Middle-level CTE, June 2018, Preliminary Release for Field Review and Piloting; downloaded from nyctecenter.org). Page footers removed; wrapped lines rejoined; nothing else changed.

**CTE CONTENT AREA: Family and Consumer Sciences**  
**CONTENT MODULE TITLE: Nutrition and Wellness**  

### MODULE DESCRIPTION

This module introduces students to the ways food choices and eating patterns impact overall health. Through project based and/or culinary lab experiences, students will develop foundational skills for planning, selecting, purchasing, preparing, serving, and storing nutritious foods. Students will have the opportunity to explore a variety of career options related to nutrition and wellness and identify the knowledge, skills, education, and training necessary for success within these fields.

### GUIDING QUESTION

What knowledge and skills are necessary to demonstrate introductory skills for planning, selecting, purchasing, preparing, serving, and storing nutritious foods?

### MODULE CONTENT

*Nutrition and Wellness*

#### 1. Culinary Management
Students will
- a) Identify common kitchen tools and equipment and the uses for each
- b) Demonstrate safety and sanitation procedures when handling food and equipment
- c) Demonstrate accurate measuring of dry/solid, liquid, and small quantity ingredients
- d) Prepare a simple recipe
- e) Plan a nutritious meal
- f) Safely store food items
- g) Prepare and serve a simple meal
- h) Demonstrate appropriate table setting
- i) Practice food sharing behaviors that show consideration for other cultures and promote social acceptance

#### 2. Nutrition Across the Lifespan
Students will
- a) Identify nutrient groups, common sources of nutrients, and nutrient requirements across the lifespan
- b) Describe the relationship of nutrition and physical activity to the wellness of individuals and families
- c) Identify sources of authentic and credible dietary information
- d) Identify psychological influences on nutrition and food choice relating to diet

#### 3. Consumer Resources and Finance
Students will
- a) Create and organize a shopping list
- b) Describe and demonstrate food purchasing strategies that maximize the benefits of the food budget
- c) Identify monetary influences on one's ability to select and purchase nutritious foods

#### 4. Career Pathways
Students will
- a) Investigate careers in nutrition, wellness, and culinary arts and identify the pathways to reach them
- b) Assess personal knowledge, skills, and interest in careers in nutrition, wellness, and culinary arts and evaluate personal suitability for these careers

### ILLUSTRATIVE ACTIVITIES by Theme Module

Career and Community Opportunities
Public Health and Nutrition
Students research careers in public health and community nutrition to learn about nutrition programs designed to improve the health and wellness of people in various stages of the lifecycle. Students develop short food and nutrition learning activities to teach to preschool or elementary school students in the community to simulate work in a public health career.

Communication
Food Allergy or Food Intolerance?
Students compare nutritional needs across different developmental stages and identify common dietary challenges for each stage. Students research the difference between food allergies and food intolerances. Students produce public service announcements designed to clarify misconceptions about the costs/benefits of dietary restrictions as responses to dietary challenges at particular developmental stages.

Financial and Consumer Literacy
Comparison Shopping
Students create or collect a week's worth of lunch menus (such as school lunch menus) to use to conduct a comparison shopping activity. Discuss the features of grocery items, other than price, that are considerations in food purchasing decisions. Use store circulars or local store websites to compare the expense of preparing lunch menus with grocery items purchased from different vendors. Students determine which vendor would earn their business and justify their decisions to the class.

Health, Safety, and Wellness
Food Tracking
Students will investigate electronic food tracking options. Have students keep a food log, either by hand or by using a food tracking application, for a designated amount of time. Students evaluate their eating patterns and suggest improvements to make their diets more personally healthful.

Problem Solving and Innovation
Safety and Sanitation Contracts
Students research important aspects to include in classroom kitchen safety and sanitation guidelines and apply a problem-solving strategy to develop a comprehensive "Kitchen Safety and Sanitation Contract" that is agreeable to all. Students create and share their own kitchen safety and sanitation memes to help the class learn and remember the classroom kitchen guidelines.

Sustainability
Composting
Students build soda bottle bioreactors to compost wastes collected from classroom foods laboratories. Individuals or small groups of students compost different food scraps in their bioreactors to see what composts fastest. Investigate ways composting could be done on a larger scale, such as in the school cafeteria.

### STANDARDS ADDRESSED

New York State Career Development and Occupational Studies (CDOS) Standards
Intermediate Level
http://www.p12.nysed.gov/cte
Standard 1: Career Development
Students will be knowledgeable about the world of work, explore career options, and relate personal skills, aptitudes, and abilities to future career decisions.
Standard 2: Integrated Learning
Students will demonstrate how academic knowledge and skills are applied in the workplace and other settings.
Standard 3a: Universal Foundation Skills
Students will demonstrate mastery of the foundation skills and competencies essential for success in the workplace

NYS Learning Standards for Family and Consumer Sciences
Intermediate Level
http://www.p12.nysed.gov/cte/
Standard 1: Personal Health and Fitness
Students will have the necessary knowledge and skills to establish and maintain physical fitness, participate in physical activity, and maintain personal health
Standard 2: Safe and Healthy Environment
Students will acquire the knowledge and ability necessary to create and maintain a safe and healthy environment
Standard 3: Resource Management
Students will understand and be able to manage their personal and community resources

Common Career Technical Core Standards
https://www.careertech.org/career-ready-practices
Career Ready Practices
1. Act as a responsible and contributing citizen and employee
2. Apply appropriate academic and technical skills
3. Attend to personal health and financial well-being
5. Consider the environmental, social and economic impacts of decisions
7. Employ valid and reliable research strategies
8. Utilize critical thinking to make sense of problems and persevere in solving them
10. Plan education and career paths aligned to personal goals
11. Use technology to enhance productivity
12. Work productively in teams while using cultural global competence

National Standards for Family and Consumer Sciences Education
http://www.nasafacs.org/
14.1 Analyze factors that influence nutrition and wellness practices across the lifespan
14.1.1 Explain physical, emotional, social, psychological, and spiritual components of individual and family wellness
14.1.2 Analyze the effects of psychological, cultural, and social influences on food choices and other nutrition practices
14.1.3 Analyze the governmental, economic, and technological influences on food choices and practices
14.1.4 Analyze the effects of global and local events and conditions on food choices and practices
14.1.5 Analyze legislation and regulations related to nutrition and wellness
14.2 Evaluate the nutritional needs of individuals and families in relation to health and wellness across the life span
14.2.1 Analyze the effect of nutrients on health, appearance, and peak performance
14.2.2 Analyze the relationship of nutrition and wellness to individual and family health throughout the life span
14.2.3 Analyze the effects of food and diet fads, food addictions, and eating disorders on wellness
14.2.4 Analyze sources of food and nutrition information, including food labels, related to health and wellness
14.3 Demonstrate ability to acquire, handle, and use foods to meet nutrition and wellness needs of individuals and families across the life span
14.3.1 Apply various dietary guidelines in planning to meet nutrition and wellness needs
14.3.2 Design strategies that meet the health and nutrition requirements of individuals and families with special needs
14.3.3 Demonstrate ability to select, store, prepare, and serve nutritious and aesthetically pleasing foods
14.4 Evaluate factors that affect food safety from production through consumption
14.4.1 Analyze conditions and practices that promote safe food handling
14.4.2 Analyze safety and sanitation practices throughout the food chain
14.4.3 Analyze how changes in national and international food production and distribution systems influence the food supply
14.4.4 Analyze federal, state, and local inspection and labeling systems that protect the health of [line ends here in the source PDF]
14.4.5 Analyze food borne illness factors, including causes, foods at risk, and methods of prevention commercially and by individuals and families
14.4.6 Analyze public dialogue about food safety and sanitation

14.5 Evaluate the influence of science and technology on food composition, safety, and other issues
14.5.1 Analyze how scientific and technical advances influence the nutrient content, availability, and safety of foods
14.5.2 Analyze how the scientific and technical advances in food processing, storage, product development, and distribution influence nutrition and wellness
14.5.3 Analyze the effects of technological advances on selection, preparation and home storage of food
14.5.4 Analyze the effects of food science and technology on meeting nutritional needs

### RESOURCES

USDA Dietary Guidelines, Information and Resources
https://www.choosemyplate.gov/
This website provides resources, tips, and ideas that can help young people take charge and learn to make their own choices. Building healthy food and physical activity habits will help them now and as they enter adulthood.

USDA Center for Nutrition Policy and Promotion
https://www.SuperTracker.usda.gov.
Super Tracker is a comprehensive, state-of-the-art food and physical activity tracking tool available at https://www.SuperTracker.usda.gov. Based on the Dietary Guidelines for Americans, this tool is designed to assist students as they make lifestyle changes.

BAM! Body and Mind
https://www.cdc.gov/bam/teachers/index.html
This site provides nutritional advice and recommendations for students aged 9-13 years old as well as additional curriculum aids and resources for teachers.

Kids Health
http://kidshealth.org/en/kids/labels.html
Provides information, activities, and videos at an age appropriate level on how to use nutrition fact labels.

New York State Association of Family and Consumer Sciences Educators (NYSAFCSE)
http://www.nysafcse.org/
Family and Consumer Sciences education in New York state is delivered through a variety of courses designed to promote student attainment of the intermediate and commencement level New York State Learning Standards for Family and Consumer Sciences (FACS) and Career Development and Occupational Studies (CDOS). This professional organization hosts a website that includes "Curriculum" and a "Best Practices" tabs.

Career and Technical Education Technical Assistance Center of New York (CTE TAC)
http://nyctecenter.org/
The Career and Technical Education Technical Assistance Center (CTE TAC) operates under a state contract to assist the New York State Education Department (NYSED) in carrying out its mission of improving the quality, access, and delivery of career and technical education through research-based methods and strategies resulting in broader CTE opportunities for all students.


**END CONTENT MODULE TEXT: Nutrition and Wellness**



## CONTENT MODULE: Food Systems and Production

**BEGIN CONTENT MODULE TEXT: Food Systems and Production**
Source file: `10 Reference/Standards/NYS ML CTE FACS Content Module 06 - Food Systems and Production.pdf` (NYS Middle-level CTE, June 2018, Preliminary Release for Field Review and Piloting; downloaded from nyctecenter.org). Page footers removed; wrapped lines rejoined; nothing else changed.

**CTE CONTENT AREA: Family and Consumer Sciences**  
**CONTENT MODULE TITLE: Food Systems and Production**  

### MODULE DESCRIPTION

This module introduces students to the ways in which climate, geography, and culture influence the availability, sustainability, and quality of food. Students will examine the challenges, conditions, and technological advances which affect the food supply from production through consumption. They will identify and prepare foods to learn about cuisines, ingredients used, and industry standards. Students will have the opportunity to explore the wide variety of career options related to food systems and production and to identify the knowledge, skills, education, and training necessary for success within these fields.

### GUIDING QUESTION

What knowledge and skills are necessary to demonstrate introductory understanding of choices, availability, sustainability, purchasing, preparation, and production of food?

### MODULE CONTENT

*Food Systems and Production*

#### 1. Basic Culinary Skills
Students will
- a) Apply basic culinary and management skills to the preparation of nutritious food
- b) Identify common kitchen tools, equipment, and the uses for each
- c) Demonstrate safety and sanitation procedures when handling food and tools
- d) Demonstrate accurate measuring of dry/solid, liquid, and small quantity ingredients
- e) Prepare a simple recipe

#### 2. Food Preparation
Students will
- a) Identify specific foods from the region being studied
- b) Explore factors affecting regional food choices
- c) Prepare foods from the region being studied using ingredients common to the region
- d) Demonstrate the skills and techniques common to food preparation of the region
- e) Practice safety and sanitation practices and procedures in the preparation of food

#### 3. Current Issues Related to Food in Global Societies
Students will
- a) Describe factors affecting the food supply, including but not limited to geography, climate, economics, transportation systems, farming methods, energy, population density, political systems, natural disasters, and food waste
- b) Identify how current laws, regulations, and policies affect the availability, selection, and preparation of food in various regions and countries
- c) Explore factors that create current food-related health concerns around the world

#### 4. Future of Food in a Global Society
Students will
- a) Understand the components of sustainable food systems
- b) Explore the advantages and disadvantages of selecting and purchasing sustainable food products
- c) Evaluate the quality of foods produced through sustainable methods
- d) Identify the consequences of food scarcity and hunger on society
- e) Explore technological advances that affect the global food supply

#### 5. Consumer Resources and Finance
Students will
- a) Demonstrate management of individual and family resources to select and purchase food
- b) Analyze decisions about providing safe and nutritious food for individuals and families
- c) Apply consumer skills to selecting and purchasing of food items
- d) Apply time management, organizational, and process skills to prioritize tasks and achieve goals

#### 6. Career Pathways
Students will
- a) Explain roles and functions of individuals engaged in food industry careers
- b) Investigate education, training requirements, and opportunities for career paths in global food industry
- c) Assess personal employability skills for careers in the global foods industry and evaluate personal suitability for said careers

### ILLUSTRATIVE ACTIVITIES by Theme Module

Career and Community Connections
Community Food Festivals
Students research ethnic festivals, cultural activities, and religious celebrations in the community and report on the history and purpose of the events. Students identify traditional foods served and explore factors that led to these food traditions. Teachers invite community representatives in to share and to teach students how to prepare examples of traditional celebration foods.

Communication and Interpersonal Relationships
Food Production Videos
Students work in small groups. Each group creates a video showing one step food goes through on its route to reach consumers: farm, processor, distribution center, retail outlet, or consumer. Student groups present their videos which together teach classmates how food flows through the production process.

Financial and Consumer Literacy
Food Budgeting Decisions
Students select recipes for vegetable dishes they would like to prepare in class. Students determine the cost of preparing the recipes using organic vs. conventionally grown foods from the grocery store. Students research the cost of obtaining the same organic and conventional ingredients from a local source, such as a farmers market. As a class, students discuss how these findings impact consumers' food budgeting decisions.

Health, Safety, and Wellness
Kitchen Inspections
Provide students with the form that the local/state health department uses when conducting inspections of restaurant kitchens. Have students adjust the form to develop a classroom Kitchen Inspection Checklist. Following foods laboratory experiences, students assume the role of health inspector and complete the checklist noting areas in need of attention to bring them up to safety and sanitation codes.
Problem Solving and Innovation
Worldwide Food-Related Health Concerns
Students explore current food-related health concerns around the world (e.g. disease, famine, tourism, availability of potable water, poverty, climate change, threats to food supplies). Investigate organizations and technologies that are assisting with immediate threats and developing long-term solutions for these food-related health issues. Determine the possibility for, and the appropriateness of, a school campaign to support an organization involved in this work.

Sustainability
Classroom Herb Garden
Students determine the types of herbs used in a variety of regional cuisines. Provide seeds, growing medium, and containers for a classroom herb garden. Students create the classroom garden and tend the herbs. Students use classroom herbs in their foods laboratories.

### STANDARDS ADDRESSED

New York State Career Development and Occupational Studies (CDOS) Standards
Intermediate Level
http://www.p12.nysed.gov/cte/
Standard 1: Career Development
Students will be knowledgeable about the world of work, explore career options, and relate personal skills, aptitudes, and abilities to future career decisions.
Standard 2: Integrated Learning
Students will demonstrate how academic knowledge and skills are applied in the workplace and other settings.
Standard 3a: Universal Foundation Skills
Students will demonstrate mastery of the foundation skills and competencies essential for success in the workplace.

NYS Learning Standards for Family and Consumer Sciences

Intermediate level
Standard 1: Personal Health and Fitness
Students will have the necessary knowledge and skills to establish and maintain physical fitness, participate in physical activity, and maintain personal health.
Standard 2: Safe and Healthy Environment
Students will acquire the knowledge and ability necessary to create and maintain a safe and healthy environment.
Standard 3: Resource Management
Students will understand and be able to manage their personal and community resources

Common Career Technical Core Standards
https://www.careertech.org/career-ready-practices
Career Ready Practices
2. Apply appropriate and academic and technical skills
4. Communicate clearly and effectively and with reason
5. Consider environmental, social, and economic impacts of decisions
6. Demonstrate creativity and innovation
7. Employ valid and reliable research strategies
8. Utilize critical thinking to make sense of problems and persevere in solving them
9. Model integrity, ethical leadership, and effective management
12. Work productively in teams while using cultural global competence

National Family and Consumer Sciences Standards
http://www.nasafacs.org/
14.0 Nutrition and Wellness
Demonstrate nutrition and wellness practices that enhance individual and family well-being
14.1 Analyze factors that influence nutrition and wellness practices across the life span.
14.1.1 Explain physical, emotional, social, psychological, cultural, and spiritual components of individual and family wellness.
14.1.2 Investigate the effects of psychological, cultural, and social influences on food choices and other nutrition practices.
14.1.3 Investigate the governmental, economic, and technological influences on food choices and practices.
14.1.4 Analyze the effects of global, regional, and local events and conditions on food choices and practices.
14.1.5 Analyze legislation and regulations related to nutrition and wellness.

14.3 Demonstrate ability to acquire, handle, and use foods to meet nutrition and wellness needs of individuals and families across the life span.
14.3.3 Demonstrate ability to select, store, prepare, and serve nutritious, aesthetically pleasing food and food product.
14.3.4 Evaluate policies and practices that affect food security, sustainability, food integrity, and nutrition and wellness of individuals and families.

14.4 Evaluate factors that affect food safety from production through consumption
14.4.1 Analyze conditions and practices that promote safe food handling.
14.4.2 Analyze safety and sanitation practices.
14.4.3 Analyze how changes in national and international food production and distribution systems influence the food supply, including sustainability, organic food production and the impact of genetically modified foods.

### RESOURCES

National Agriculture in the Classroom
Filling the Global Grocery Bag
https://www.agclassroom.org/teacher/matrix/lessonplan.cfm?lpid=29
The National Agricultural Literacy Curriculum Matrix is an online, searchable, and standards-based curriculum map for K-12 teachers. The Matrix contextualizes national education standards in science, social studies, and nutrition education with relevant instructional resources.

USDA National Institute of Food and Agriculture (NIFA)
Hunger and Food Security Programs
https://nifa.usda.gov/program/hunger-food-security-programs
NIFA addresses hunger and food security through research, education, and extension work within the Land-Grant University System; through federally funded state nutrition education programs; through grant programs for private nonprofits to address community food security issues; and through partnerships across USDA.

United Nations
World Food Program (WFP)
http://www.wfp.org/
In emergencies, WFP gets food to where it is needed, saving the lives of victims of war, civil conflict, and natural disasters. After the cause of an emergency has passed, WFP uses food to help communities rebuild their shattered lives. WFP is part of the United Nations system and is voluntarily funded.

Utah Education Network
Foreign Foods
https://www.uen.org/lessonplan/view/17665
UETN connects school districts, schools, and higher education institutions to a robust network and quality educational resources.

Association of Career and Technical Education
Career Planning Guide
https://www.acteonline.org/wp-content/uploads/2018/02/ACTE_CC_Paper_FINAL.pdf
Research has identified middle school as a time when students can benefit the most from career exploration, a process of building self-awareness, learning about potential careers, and developing a plan for reaching future goals.

AdvanceCTE
Middle Level Career Interest Inventory
https://cte.careertech.org/sites/default/files/StudentInterestSurvey-English.pdf
AdvanceCTE provides a Career Interest Inventory worksheet to use with students in helping them identify the potential matches to the 16 career clusters available to them

Association of CTE Administrators (ACTEA)
CTE Strong Videos
http://www.ctestrong.com
Edge Factor has created a series of inspirational videos related to career and education that provide students with a very contemporary perspective on CTE options. Career Cluster videos provide a new look at the many career options that students have in high school and beyond.

Career and Technical Education Technical Assistance Center of New York (CTE TAC)
http://nyctecenter.org/
The Career and Technical Education Technical Assistance Center (CTE TAC) operates under a state contract to assist the New York State Education Department (NYSED) in carrying out its mission of improving the quality, access, and delivery of career and technical education through research-based methods and strategies resulting in broader CTE opportunities for all students.

New York State Association of Family and Consumer Sciences Educators (NYSAFCSE)
http://www.nysafcse.org/
Family and Consumer Sciences education in New York state is delivered through a variety of courses designed to promote student attainment of the intermediate and commencement level New York State Learning Standards for Family and Consumer Sciences (FACS) and Career Development and Occupational Studies (CDOS). This professional organization hosts a website that includes "Curriculum" and a "Best Practices" tabs.


**END CONTENT MODULE TEXT: Food Systems and Production**



## THEME MODULE: Career and Community Opportunities

**BEGIN THEME MODULE TEXT: Career and Community Opportunities**
Source file: `10 Reference/Standards/NYS ML CTE Theme Module 01 - Career and Community Opportunities.pdf` (NYS Middle-level CTE, June 2018, Preliminary Release for Field Review and Piloting; downloaded from nyctecenter.org). Page footers removed; wrapped lines rejoined; nothing else changed.

**New York State Middle-Level Career and Technical Education**  
**THEME MODULE TITLE: Career and Community Opportunities**  

### MODULE DESCRIPTION

This module introduces students to a variety of careers and provides students opportunities to explore their personal goals, interests, and work-world plans. Current issues related to societal, economic, and technological changes impacting employment will be examined. Students will explore the wide variety of career options related to the 16 national career clusters and will identify the knowledge, skills, education, and training necessary for success within these fields.

### GUIDING QUESTION

What knowledge and skills are necessary to demonstrate introductory understanding of the influences that societal, economic, and technological changes have on employment and the impact that employability skills, interests, and aptitudes have on individuals’ career choices and postsecondary options?

### MODULE CONTENT

*Career and Community Connections*

#### 1. The Work World
Students will
- a) Describe reasons for working in paid and unpaid work environments
- b) Discuss the value of work as it relates to the individual and to society
- c) Compare the similarities and differences among home, school, community, and work environments
- d) Identify changes likely to occur in home, school, and community environments that will likely change work environments in the future

#### 2. Career Clusters
Students will
- a) Identify and use career resources to obtain information about careers and employment trends
- b) Understand the term "career cluster" and describe how and why specific careers are grouped together
- c) Examine the 16 national career clusters and their use in guiding initial career planning
- d) Identify clusters for further investigation based on personal interests

#### 3. Employability Skills
Students will
- a) Identify personal characteristics such as abilities, interests, and values and examine how they might impact career choices
- b) Describe characteristics and behaviors that enable individuals to contribute to the success of a group in a variety of community and work situations
- c) List and describe employability skills and ways they benefit individuals in community and work situations
- d) Demonstrate personal development of employability skills through practice of these skills in a variety of classroom applications

#### 4. Career Plans
Students will
- a) Examine potential career choices to determine knowledge, skills, and abilities associated with each
- b) Assess personal characteristics such as interests, abilities, and aptitudes in relation to characteristics associated with careers of interest
- c) Examine model career plan formats, including the NYS Career Plan, and explain the purpose of developing a personal career plan
- d) Formulate a personal career plan that includes short-term and long-term goals needed to carry out the career plan

#### 5. Community Needs Assessment
Students will
- a) List and describe the typical needs of community members at each stage in the lifespan
- b) Research community resources available to support individuals and families
- c) Explore the role adolescents can play in providing for the needs and enhancing the lives of community members

#### 6. Participation in Community Activities
Students will
- a) Identify community programs and projects that could benefit from student participation
- b) Demonstrate personal development of employability skills through practice of these skills in an activity to benefit a community program or project

#### 7. Career Pathways
Students will
- a) Discuss ways career path decisions influence goals for lifelong learning and leisure opportunities
- b) Examine workplace issues and trends and describe their impact on individual and family lifestyles
- c) Research ways social, economic, and technological changes have led to adaptations in work and community environments and expectations

### ILLUSTRATIVE ACTIVITIES by CTE Content Area

Agricultural Education
Looking to the Future
Invite a panel of recent graduates to discuss their current experiences in college and/or the workforce. Ask panelists to share what they are studying and what they are doing. Have panelists focus on the ways their school experiences, including FFA, helped prepare them for the challenges of their current roles.

Business and Marketing Education
Career Cluster Experts
Arrange job shadow experiences with local businesses and community agencies. Assign students to settings representing career clusters they have identified as their interest areas. Have students become the "career cluster experts" by presenting what they have learned from their job shadow experiences to the class.

Family and Consumer Sciences Education
Career Plan
Create a career plan using the NYS Career Zone, a career exploration resource used to promote career development. Students complete a self-assessment activity to help them identify personal interests and career goals.

Health Science Education
Public Health Brochures
Discuss the wide range of careers in the healthcare field. Then, focus on the role of public health agencies in the community. Students develop informational brochures to educate others about health supports available in the local community.

Technology Education
Employability Skills for engineers
Research a technology or engineering-related career using a variety of resources such as in-person interviews, job search websites, and college websites. Identify what the job requires for education or training, what types of activities are done, and what the pay or benefits would be. Write a reflection describing how personal skills and interests would be assets in this career.

Trade and Technical Education
Employment Projections
Review both print and online job postings for the local community and compile a list of the most common job listings. Compare these local job openings to state and national projections. Research educational requirements for the jobs with the highest vacancies. Develop model high school education plans showing the courses and CTE programs that can help students develop the skills they will need to fill these employment gaps.

### STANDARDS ADDRESSED

New York State Career Development and Occupational Studies (CDOS) Standards
Intermediate Level
Standard 1: Career Development
Students will be knowledgeable about the world of work, explore career options, and relate personal skills, aptitudes, and abilities to future career decisions
Standard 2: Integrated Learning
Students will demonstrate how academic knowledge and skills are applied in the workplace and other settings
Standard 3a: Universal Foundation Skills
Students will demonstrate mastery of the foundation skills and competencies essential for success in the workplace

Common Career Technical Core Standards
https://www.careertech.org/career-ready-practices
Career Ready Practices
1. Act as a responsible and contributing citizen and employee
2. Apply appropriate and academic and technical skills
4. Communicate clearly and effectively and with reason
6. Demonstrate creativity and innovation
7. Employ valid and reliable research strategies
9. Model integrity, ethical leadership, and effective management
10. Plan education and career paths aligned to personal goals
11. Use technology to enhance productivity
12. Work productively in teams while using cultural global competence

National Agricultural Education Standards
https://www.ffa.org
CS.05. Describe career opportunities and means to achieve those opportunities in each of the agriculture career pathways

National Business Education Standards
https://www.nbea/newsite/curriculum/standards/index.html
Career Development
I. Self-Awareness Achievement Standard
Assess personal skills, abilities, and aptitudes and personal strengths and weaknesses as they relate to career exploration and development
II. Career Research Achievement Standard
Utilize career resources to develop a career information database that includes international career opportunities
III. Workplace Expectations Achievement Standard
Relate the importance of workplace expectations to career development
IV. Career Strategy Achievement Standard
Apply knowledge gained from individual assessment to a comprehensive set of goals and individual career plan
V. School to Career Transition Achievement Standard
Develop strategies to make an effective transition from school to career

National Family and Consumer Sciences Standards
http://www.nasafacs.org/national-standards-and-competencies.html
1.0 Career, Community, and Family Connections
Integrate multiple life roles and responsibilities in family, work, and community settings
1.2 Demonstrate transferable knowledge, attitudes, technical and employability skills in school, community, and workplace settings
1.3 Evaluate the reciprocal effects of individual and family participate in community and civic activities

National Consortium for Health Science Education
https://www.healthscienceconsortium.org/national-health-science-standards/
Foundation Standard 4 Employability Skills
Utilize employability skills to enhance employment opportunities and job satisfaction
4.3 Career Decision-making
4.31 Research levels of education, credentialing requirements, and employment trends in health professions
4.32 Distinguish differences among careers within health sciences pathways
4.4 Employability Preparation
4.41 Develop components of a personal portfolio
4.42 Identify strategies for pursuing employment

International Technology and Engineering Educators Association
Standards for Technological Literacy
https://www.iteea.org/39197.aspx
The Nature of Technology
3. Students will develop an understanding of the relationships among technologies and the connections between technology and other fields
Technology and Society
4. Students will gain an understanding of the cultural, social, economic, and political effects of technology
G. Economics, political, and cultural issues are influenced by the development and use of technology
6. Students will gain an understanding of the role of society in the development and use of technology
D. Throughout history, new technologies have resulted from the demands, values, and interests of individuals, businesses, industries, and societies

USDOE Employability Skills
http://cte.ed.gov/employability skills/
Applied Knowledge: Applied Academic Skills, Critical Thinking Skills
The thoughtful integration of academic knowledge and technical skills put to practical use
Effective Relationships: Interpersonal Skills, Personal Qualities
The skills that enable individuals to interact effectively with clients, coworkers, and supervisors
Workplace Skills: Resource Management, Information Use, Communication Skills, Systems Thinking, Technology Use
The skills employees need to successfully perform work tasks

### RESOURCES

New York State Department of Labor
New York State Career Zone
https://www.careerzone.ny.gov
Career Zone is a no-cost online career exploration and planning tool developed by the New York State Department of Labor. It offers career and education information on thousands of careers, as well as, self-assessment and career planning tools. Career Zone is appropriate for users from middle school through adult.

New York State Employment Projections
https://www.labor.ny.gov/stats/lsproj.shtm
The expected employment growth and annual openings for all published occupations in New York State and its ten labor market regions are housed on this website. These 10-year forecasts, which are updated every other year, are intended to help individuals make informed education and career decisions and to assist educators and training providers in planning for future needs.

United States Department of Labor
CareerOneStop
https://www.careeronestop.org
CareerOneStop is the career, training, and job search website for the U.S. Department of Labor. The website serves job seekers, businesses, students, and career advisors with a variety of free online tools, information and resources.

Bureau of Labor Statistics
https://www.bls.gov
The Bureau of Labor Statistics collects, processes, analyzes, and disseminates essential statistical data, and serves as a statistical resource to the Department of Labor. The Bureau of Labor Statistics publishes a table of Fastest Growing Occupations, produced by the Employment Projections program.

New York Chambers of Commerce
http://www.officialusa.com/stateguides/chambers/newyork.html
The purpose of each New York Chamber of Commerce is to assist small businesses and enhance economic growth of the surrounding area. Chambers of Commerce provide local businesses with an opportunity to network with other businesses in the area by working together and coordinating events. New York Chambers of Commerce also provide local region and community information for visitors and new residents.

The College Board
https://bigfuture.collegeboard.org/get-started
The College Board website is an interactive college and career planning website that provides details on several career pathways related to career clusters. Educational requirements are included.

Career and Technical Education Technical Assistance Center of New York (CTE TAC)
http://nyctecenter.org/
The Career and Technical Education Technical Assistance Center (CTE TAC) operates under a state contract to assist the New York State Education Department (NYSED) in carrying out its mission of improving the quality, access, and delivery of career and technical education through research-based methods and strategies resulting in broader CTE opportunities for all students.


**END THEME MODULE TEXT: Career and Community Opportunities**



## THEME MODULE: Communication and Interpersonal Relationships

**BEGIN THEME MODULE TEXT: Communication and Interpersonal Relationships**
Source file: `10 Reference/Standards/NYS ML CTE Theme Module 02 - Communication and Interpersonal Relationships.pdf` (NYS Middle-level CTE, June 2018, Preliminary Release for Field Review and Piloting; downloaded from nyctecenter.org). Page footers removed; wrapped lines rejoined; nothing else changed.

**New York State Middle-Level Career and Technical Education**  
**THEME MODULE TITLE: Communication and Interpersonal Relationships**  

### MODULE DESCRIPTION

This module introduces students to the importance of developing effective communication and interpersonal relationship skills to enhance interactions with others in home, school, community, and workplace situations. Skills related to inter-age and peer relationships, conflict prevention and management, and workplace-specific communication will also be examined.

### GUIDING QUESTION

What communication and interpersonal skills can enhance an individual's ability to develop caring, respectful, effective relationships within the home, school, community, and workplace?

### MODULE CONTENT

*Communication and Interpersonal Relationships*

#### 1. Communication
Students will
- a) Examine the roles and functions of communication in home, school, community, and workplace settings
- b) Describe types of communication (e.g., oral, verbal, nonverbal, digital)
- c) Examine communication styles and their effects on relationships
- d) Determine ways that communication skill deficits can adversely affect relationships
- e) Understand the role of communication skills in establishing cooperation, compromise, and collaboration in relationships
- f) Demonstrate personal development of communication skills through practice of these skills in a variety of classroom applications

#### 2. Listening
Students will
- a) List and describe barriers to effective communication in home, school, community, and workplace settings
- b) Distinguish between hearing and listening
- c) Show understanding of active listening and feedback techniques
- d) Demonstrate personal development of listening skills through practice of these skills in a variety of classroom applications

#### 3. Workplace Communication
Students will
- a) List the similarities and differences between personal and workplace communication and the uses of technology in each
- b) Describe ways effective communication promotes workplace efficiency
- c) Examine a variety of types of reports required of workers in a variety of careers

- d) Describe the role of observation in the development of work reports
- e) Explain how to give and receive accurate reports in a variety of formats
- f) Demonstrate effective communication skills in a group setting to accomplish a task

#### 4. Relationships
Students will
- a) Define the term "relationship"
- b) Analyze the functions and expectations of various types of relationships and how they may change over time
- c) Examine processes for building and maintaining relationships
- d) Explain the impact of personal standards and codes of conduct on relationships
- e) Demonstrate and practice behaviors that promote healthy relationships through a variety of classroom applications

#### 5. Peer Relationships
Students will
- a) Define the term "peer"
- b) Discuss the characteristics of peer relationships that make them different from relationships with those in other stages of the lifespan
- c) Describe how self-esteem and self-image impact peer relationships
- d) Analyze the influence of peers on personal development, choices, and relationships
- e) Explain how individuals can assert personal choices within a peer group structure
- f) Identify and practice ways the individual can have a positive impact on peers through a variety of classroom applications

#### 6. Conflict Prevention and Management
Students will
- a) Assess personal strengths and weaknesses and ways they influence relationships
- b) List and describe factors that contribute to healthy and unhealthy relationships
- c) Research conflict prevention and management techniques
- d) Explore how similarities and differences among people affect conflict prevention and management
- e) Investigate stress management strategies that are appropriate for home, school, community, and work settings
- f) Contribute to a classroom environment that encourages respect for the ideas, perspectives, and contributions of all

#### 7. Careers in the Communication and Human Services Field
Students will
- a) Investigate knowledge, skills, and practices needed for a career in the communications and human services fields
- b) Analyze career paths within the communications and human services fields
- c) Evaluate personal skills, abilities, and interests for employment in the communications and human services fields

### ILLUSTRATIVE ACTIVITIES by CTE CONTENT AREA

Agricultural Education
Elevator Speeches
Students work in small groups to prepare and present short "elevator speeches" describing FFA. Each group will have a separate aspect of FFA about which to communicate, such as leadership, awards, service projects and competitive events. Have class members take notes on the speeches and report on what they have heard. Evaluate the accuracy and completeness of the reports.

Business and Marketing Education
Personal vs. Business Calls
Discuss the similarities and differences between personal and business telephone communications with the whole class. In pairs, students create and present role-plays of either personal or business telephone calls. Class members list ways those conversing used effective or ineffective techniques and suggest ways to improve. Pairs incorporate class suggestions into a second presentation of their call.

Family and Consumer Sciences Education
Fact Checking
Students choose an article from a popular source (one that aims to inform a wide array of readers about issues of interest using an informal tone and scope) to learn about a peer group relationship issue, such as bullying or safe use of social media. Students list key claims presented in the article. Students conduct a "fact check" using a scholarly source on the same issue. Discuss the similarities and differences in the manner and accuracy of information from the two sources.

Health Sciences Education
Relay Telecommunications
Research the field of Relay Telecommunications, a communication service that connects individuals who are deaf, hard of hearing, deaf-blind or have difficulty speaking to people who use standard telephones. Role play a variety of 7-1-1 relay call types available to match the different needs of clients. Call types might include Voice Carry Over, Hearing Carry Over, Speech-to-Speech, and Captioned Telephone. Discuss guidelines for effective communication with visually or hearing-impaired clients or patients.

Technology Education
Advertising Technological Innovations
Develop a basic website that advertises a new product or technological innovation. Include pictures and text that identify the features of the product or innovation. Create links to different pages in the website and to outside links where the user can learn more.

Trade and Technical Education
Preparing Work Order Forms
Prepare a work order form and set of cards with work requests on each (e.g., car inspection, oil change, and tire rotation; meal order for several coworkers; multi-process grooming appointment). Divide students into pairs. Partner one draws a work

request card and communicates the work request. Partner two listens without speaking, and completes the work order form. Compare the work order to the work request form. Discuss effective and ineffective communication and listening techniques used by each partner.

### STANDARDS ADDRESSED

New York State Career Development and Occupational Studies (CDOS) Standards
Intermediate Level
http://www.p12.nysed.gov/cte/
Standard 1: Career Development
Students will be knowledgeable about the world of work, explore career options, and relate personal skills, aptitudes, and abilities to future career decisions
Standard 2: Integrated Learning
Students will demonstrate how academic knowledge and skills are applied in the workplace and other settings
Standard 3a: Universal Foundation Skills
Students will demonstrate mastery of the foundation skills and competencies essential for success in the workplace

Common Career Technical Core Standards
https://www.careertech.org/career-ready-practices
Career Ready Practices
1. Act as a responsible and contributing citizen and employee
2. Apply appropriate and academic and technical skills
4. Communicate clearly and effectively and with reason
8. Utilize critical thinking to make sense of problems and persevere in solving them
9. Model integrity, ethical leadership, and effective management
10. Plan education and career paths aligned to personal goals
11. Use technology to enhance productivity
12. Work productively in teams while using cultural global competence

National Agricultural Education Standards
https://www.ffa.org/the council/afnr
CRP.04 Communicate clearly, effectively, and with reason
CRP.09 Model integrity, ethical leadership, and effective management
CRP.12 Work productively in teams while using cultural/global competence
Note: National Agricultural Education Standards CRP .01-.12 coincide with Common Career Technical Core Standards

National Business Education Standards
https://www.nbea.org/newsite/curriculum/standards/index.html
Communication
I. Foundations of Communication Achievement Standard
Communicate in a clear, complete, concise, correct, and courteous manner on personal and professional levels
II. Societal Communication Achievement Standard
Apply basic social communication skills in personal and professional situations

III. Workplace Communication Achievement Standard
Incorporate appropriate leadership and supervision techniques, customer service strategies, and personal ethics standards to communicate effectively with various business constituencies
IV. Technological Communication Achievement Standard
Use technology to enhance the effectiveness of communication
National Family and Consumer Sciences Standards
https://www.nasafacs.org/national-standards-and-competencies.html
13.0 Interpersonal Relationships
13.1 Analyze functions and expectations of various types of relationships
13.2 Analyze personal needs and characteristics and their effects on interpersonal relationships
13.3 Demonstrate communication skills that contribute to positive relationships
13.4 Evaluate effective conflict management techniques
13.5 Demonstrate teamwork and leadership skills in the family, workplace, and community
13.6 Demonstrate standards that guide behavior in interpersonal relationships

National Consortium for Health Science Education
https://www.healthscienceconsortium.org/national-health-science-standards/
Foundation Standard 2: Communications
Demonstrate methods of delivering and obtaining information while communicating effectively
2.1 Concepts of Effective Communication
2.11 Model verbal and nonverbal communication
2.12 Identify common barriers to communication
2.13 Identify the differences between subjective and objective information
2.14 Interpret elements of communication using basic sender-receiver-message-feedback model
2.15 Practice speaking and active listening skills
2.16 Modify communication to meet the needs of the patient/client and be appropriate to the situation
2.3 Written Communication
2.31 Utilize proper elements of written and electronic communication
2.32 Prepare examples of technical, informative, and creative writing

International Technology and Engineering Educators Association
Standards for Technological Literacy
https://www.iteea.org/39197.aspx
The Designed World
17. Students will develop an understanding of and be able to select and use information and communication technologies
H. Information and communication systems allow information to be transfered from human to human, human to machine, and machine to machine
I. Communication systems are made up of a source, encoder, transmitter, receiver, decoder, and destination
J. The design of a message is influenced by such factors as the intended audience, medium, purpose, and nature of the message
K. The use of symbols, measurements, and drawings promotes clear communication by providing a common language to express ideas
USDOE Employability Skills
http://cte.ed.gov/employability skills/
Applied Knowledge: Applied Academic Skills, Critical Thinking Skills
The thoughtful integration of academic knowledge and technical skills put to practical use
Effective Relationships: Interpersonal Skills, Personal Qualities
The skills that enable individuals to interact effectively with clients, coworkers, and supervisors
Workplace Skills: Resource Management, Information Use, Communication Skills, Systems Thinking, Technology Use
The skills employees need to successfully perform work tasks

### RESOURCES

New York State Education Department
Next Generation English Language Arts Learning Standards
http://www.nysed.gov/common/nysed/files/introduction-to-the-nys-english-language-arts-
standards.pdf
Every student needs to develop spoken and written communication competencies to interact in diverse ways with diverse audiences. Developing communications competencies is essential in today’s literacy-and knowledge-based society and economy.

New York State Education Department
Educational Design and Technology: Internet Safety and Cyber bullying
http://www.nysed.gov/edtech
Internet safety refers to the countless issues facing students due to the widespread use of the Internet, including the need to keep children and all users safe while online. Incidents of discrimination and harassment can begin or spread online. Therefore, schools and districts can examine policies to ensure safe and responsible Internet use by students and teachers, when technology is used for teaching and learning.

United States Department of Labor
Office of Disability Employment Policy (ODEP)
"Skills to Pay the Bills: Mastering Soft Skills for Workplace Success"
https://www.dol.gov/odep/topics/youth/softskills/
Materials were developed by ODEP to teach workforce readiness skills to youth, including youth with disabilities. The program is comprised of modular, hands-on, engaging activities that focus on six key skill areas: communication, enthusiasm and attitude, teamwork, networking, problem solving and critical thinking, and professionalism.

New York Chambers of Commerce
http://www.officialusa.com/stateguides/chambers/newyork.html
The purpose of each New York Chamber of Commerce is to assist small businesses and enhance economic growth of the surrounding area. Chambers of Commerce

provide local businesses with an opportunity to network with other businesses in the area by working together and coordinating events. New York Chambers of Commerce also provide local region and community information for visitors and new residents.

The College Board
https://bigfuture.collegeboard.org/get-started
This interactive college and career planning website provides details on several career pathways related to career clusters. Educational requirements are included on this site.

Career and Technical Education Technical Assistance Center of New York (CTE TAC)
http://nyctecenter.org/
The Career and Technical Education Technical Assistance Center (CTE TAC) operates under a state contract to assist the New York State Education Department (NYSED) in carrying out its mission of improving the quality, access, and delivery of career and technical education through research-based methods and strategies resulting in broader CTE opportunities for all students.


**END THEME MODULE TEXT: Communication and Interpersonal Relationships**



## THEME MODULE: Financial and Consumer Literacy

**BEGIN THEME MODULE TEXT: Financial and Consumer Literacy**
Source file: `10 Reference/Standards/NYS ML CTE Theme Module 03 - Financial and Consumer Literacy.pdf` (NYS Middle-level CTE, June 2018, Preliminary Release for Field Review and Piloting; downloaded from nyctecenter.org). Page footers removed; wrapped lines rejoined; nothing else changed.

**New York State Middle-Level Career and Technical Education**  
**THEME MODULE TITLE: Financial and Consumer Literacy**  

### MODULE DESCRIPTION

This module introduces students to ways financial and consumer literacy skills can help individuals achieve financial stability. Financial and consumer literacy concepts include earning income, tracking spending, borrowing and saving money, and planning for the future. Students will examine ways to apply personal organizational and decision-making skills to financial decisions and consumer choices. Current issues related to consumer rights, the uses of technology in money management, and the impact of national and global economics on personal financial plans will be introduced. Students will have the opportunity to explore career options related to financial management and to identify the knowledge, skills, education, and training necessary for success within these fields.

### GUIDING QUESTION

What knowledge and skills are necessary to demonstrate an introductory understanding of how money can be managed and how individuals can create and achieve financial goals while managing financial challenges?

### MODULE CONTENT

*Financial and Consumer Literacy*

#### 1. Earning Income
Students will
- a) Explore job and career options and initiate a career plan
- b) Compare the income potential of jobs included in their career plans
- c) Analyze factors that affect gross and net income
- d) Explain basic information found on pay stubs
- e) Analyze systems for recording income and documenting expenditures
- f) Understand that national and global economic factors that may impact personal income

#### 2. Saving, Investing, and Sharing
Students will
- a) Describe the purpose of saving money as it applies to their future goals
- b) Define "investing" and explain how saving and investing are related
- c) Explore different savings and investment tools and methods
- d) Compare various types of financial institutions and savings options available at each
- e) Investigate opportunities for sharing money through donations to charities
- f) Apply decision-making skills to saving, investing, and donating decisions

#### 3. Protecting and Insuring
Students will
- a) Identify various types of financial risk
- b) Understand and explain resources available to protect individuals from the loss of income or assets
- c) Describe ways to protect identity from theft
- d) Demonstrate personal development of basic financial planning skills through practice of these skills in a variety of classroom applications

#### 4. Buying Goods and Services
Students will
- a) Define the term "consumer" and describe the role of the consumer in the economy
- b) Distinguish between needs, wants, values, and goals and tell how each impacts spending and savings decisions
- c) Develop a spending and savings plan (budget) based on income and expenses
- d) Explain the features of checking accounts and the roles of checking accounts in budgeting and consumer purchasing
- e) Explain the influence of peers, advertising, technology, and the economy on consumer decisions
- f) Apply a decision-making model to maximize consumer satisfaction when purchasing goods and services
- g) Compare local, national, and global resources for obtaining goods and services
- h) Analyze consumer rights, responsibilities, and protections provided by local, state, federal, and global laws and policies
- i) Demonstrate personal development of consumer skills through practice of these skills in a variety of classroom applications

#### 5. Payment Options and Credit
Students will
- a) Explore and compare various payment options
- b) Define the terms "credit" and "debt"
- c) Examine factors that affect the choice to use credit, the costs and benefits of using credit, and the personal and legal responsibilities of using credit
- d) Compare the credit options available from different types of lending institutions
- e) Examine the components of a credit report and summarize a borrower's rights and responsibilities related to credit reports
- f) Understand and explain the basics of the "credit score" and the effects of consumer behaviors on their personal credit scores
- g) Describe strategies for avoiding and for correcting debt management problems

#### 6. Careers in Financial and Consumer Services
Students will
- a) Investigate knowledge, skills, and practices needed for a career in the financial and/or consumer services fields
- b) Analyze career paths within the financial and/or consumer services industries
- c) Evaluate personal skills, abilities, and interests for employment in the financial and/or consumer sciences fields

### ILLUSTRATIVE ACTIVITIES by CTE Content Area

Agricultural Education

Virtual Farm Markets
Visit a virtual farmers market. Have students compare the costs for purchasing seasonal, locally-sourced produce to obtaining food from various other sources in the community, including food pantries. Students will evaluate and report on the budgetary effect of the decision to purchase food from the farmers market vs. the budgetary effects from obtaining food from other sources.

Business and Marketing Education
Savings Options in the Community
Make a list of the types of financial institutions in the local community. Research the savings options available for middle school students at those institutions and chart the features of each, such as initial deposit required, interest rate earned, statement formats available, account maintenance fees, and ease of deposits and withdrawals. Students determine at which institution they would open an account and present their choice to the class.

Family and Consumer Sciences Education
Personal Finance Fair
Students plan and conduct a service learning or FCCLA project to provide a Personal Finance Fair for school families. Participants gain information from representatives of local financial institutions and community agencies who provide expertise on a variety of financial needs such as car, home, and personal loans; college expense planning; investment and retirement options; and consumer credit counseling.

Health Sciences Education
Payroll Deductions
Students use a variety of sample pay stubs representing typical earnings for employees in a variety of health sciences careers such as physicians, nurses, nurse assistants, home health aides, and EMTs to identify the similarities and the differences in payroll deductions. As a class, discuss the mandatory payroll deductions required of all and the voluntary withholdings chosen by some.

Technology Education
Costs of Training
Each student identifies a job that he/she may be interested in pursuing in the future and researches the education and training costs required to start that job. Costs could include tuition, books, tools, supplies, and expenses for moving to access training. Identify the typical starting pay for the job to determine how long it might take to earn back the cost of training. Compare the expense for training to the amount one could earn during long-term career in that field.

Trade and Technical Education
Purchasing Goals
Students select a good or a service that they would like to purchase in the next 60 days and conduct consumer research to determine the best place for purchase. Students track their expenses for two weeks and develop a spending/savings plan based on their purchasing goal and their expense data. Evaluate the success of their plan at the end of the 60 days and whether the purchase might be made.

### STANDARDS ADDRESSED

New York State Career Development and Occupational Studies (CDOS) Standards
Intermediate Level
http://www.p12.nysed.gov/cte/
Standard 1: Career Development
Students will be knowledgeable about the world of work, explore career options, and relate personal skills, aptitudes, and abilities to future career decisions
Standard 2: Integrated Learning
Students will demonstrate how academic knowledge and skills are applied in the workplace and other settings
Standard 3a: Universal Foundation Skills
Students will demonstrate mastery of the foundation skills and competencies essential for success in the workplace

Common Career Technical Core Standards
https://www.careertech.org/career-ready-practices
Career Ready Practices
1. Act as a responsible and contributing citizen and employee
2. Apply appropriate and academic and technical skills
3. Attend to personal health and financial well-being
5. Consider environmental, social, and economic impacts of decisions
7. Employ valid and reliable research strategies
8. Utilize critical thinking to make sense of problems and persevere in solving them
9. Model integrity, ethical leadership, and effective management
10. Plan education and career paths aligned to personal goals
11. Use technology to enhance productivity

National Agricultural Education Standards
https://www.ffa.org/the council/afnr
ABS.01. Apply management planning principles in AFNR businesses
ABS.02. Use recordkeeping to accomplish AFNR business objectives, manage budgets, and comply with laws and regulations
CRP.03. Attend to personal health and financial well-being
Note: National Agricultural Education Standards CRP .01-.12 coincide with Common Career Technical Core Standards

National Business Education Standards
https://www.nbea.org/newsite/curriculum/standards/index.html
Personal Finance
I. Personal Decision-Making Achievement Standard
Use a rational decision-making process as it applies to the roles of citizens, workers, and consumers
II. Earning and Reporting Income Achievement Standard
Identify various forms of income and analyze factors that affect income as a part of the career decision-making process

III. Managing Finances and Budgeting Achievement Standard
Develop and evaluate a spending/savings plan
IV. Saving and Investing Achievement Standard
Evaluate savings and investment options to meet short-and long-term goals
V. Buying Goods and Services Achievement Standard
Apply a decision-making model to maximize consumer satisfaction when buying goods and services
VI. Banking and Financial Institutions Achievement Standard
Evaluate services provided by financial deposit institutions to transfer funds
VII. Using Credit Achievement Standard
Analyze factors that affect the choice of credit, the cost of credit, and the legal aspects of using credit
VIII. Protecting Against Risk Achievement Standard
Analyze choices available to consumers for protection against risk and financial loss

National Family and Consumer Sciences Standards
https://www.nasafacs.org/national-standards-and-competencies.html
2.0 Consumer and Family Resources
Evaluate management practices related to the human economic and environmental resources
2.3 Analyze policies that support consumer rights and responsibilities
2.5 Analyze relationships between the economic system and consumer actions
2.6 Demonstrate management of financial resources to meet the goals of individuals and families across the lifespan
3.0 Consumer Services
Integrate knowledge, skills, and practices needed for a career in the consumer services
3.1 Analyze career paths within the consumer services industries
3.2 Analyze factors that affect consumer advocacy
3.3 Analyze factors in developing a long-term financial management plan

National Consortium for Health Science Education
https://www.healthscienceconsortium.org/national-health-science-standards/
Foundation Standard 3: Systems
Identify how key systems affect services performed and quality of care
3.1 Healthcare Delivery Systems
3.12 Describe the responsibilities of consumers within the healthcare system
3.14 Discuss healthcare economics and common methods of payment for healthcare

International Technology and Engineering Educators Association
Standards for Technological Literacy
https://www.iteea.org/39197.aspx
The Nature of Technology
1. Students will develop an understanding of the characteristics and scope of technology
I. Corporations can often create demand for a product by bringing it onto the market and advertising it
Technology and Society
5. Students will develop an understanding of the effect of technology on the environment
F. Decisions to develop and use technologies often put environmental and economic concerns in direct competition with one another
6. Students will develop an understanding of the role of society in the development and use of technology
D. Throughout history, new technologies have resulted from the demands, values, and interests of businesses, industries, and individuals
The Designed World
19. Students will develop an understanding of and be able to select and use manufacturing technologies
K. Marketing a product involves informing the public about it as well as assisting in selling and distributing it

USDOE Employability Skills
http://cte.ed.gov/employability skills/
Applied Knowledge: Applied Academic Skills, Critical Thinking Skills
The thoughtful integration of academic knowledge and technical skills put to practical use
Effective Relationships: Interpersonal Skills, Personal Qualities
The skills that enable individuals to interact effectively with clients, coworkers, and supervisors
Workplace Skills: Resource Management, Information Use, Communication Skills, Systems Thinking, Technology Use
The skills employees need to successfully perform work tasks

### RESOURCES

New York State Education Department
Public Broadcasting System (PBS) Public Television
"What is Financial Literacy? Your Life, Your Money"
http://www.pbs.org/your-life-your-money/more/what_is_financial_literacy.php
This site offers true stories of young people facing financial difficulties. Viewers learn strategies for money management through these stories that show how and why young adults end up in financial trouble and how they improve their financial literacy.

Federal Deposit Insurance Corporation (FDIC)
Learning Bank
https://www.fdic.gov/about/learn/learning/index.html
The FDIC Learning Bank provides information about using money wisely, how banks work, and the differences between types of bank accounts and loans.

Federal Reserve
Classroom Resources
https://www.federalreserveeducation.org/resources/classroom/
The Federal Reserve offers a bank of classroom resources on a wide range of financial and consumer skills, including a link to Page One Economics. Each issue of Page One Economics provides a simple, short overview of a current economic event. "Focus on Finance" essays cover personal finance. The Teacher's Guide includes student

questions and a teacher answer key, plus additional resources and lesson ideas for classroom, extra credit, or make-up assignments.

Council for Economic Education
National Standards for Financial Literacy
https://www.councilforeconed.org/resource/national-standards-for-financial-
literacy/#sthash.uuu4YXzg.dpbs
Council for Economic Education is a nonprofit organization that focuses on personal finance and economic education for students K-12. Students who have the knowledge and vocabulary of money have the tools needed to create financial stability and opportunity for themselves, their families and their communities.

Career and Technical Education Technical Assistance Center of New York (CTE TAC)
http://nyctecenter.org/
The Career and Technical Education Technical Assistance Center (CTE TAC) operates under a state contract to assist the New York State Education Department (NYSED) in carrying out its mission of improving the quality, access, and delivery of career and technical education through research-based methods and strategies resulting in broader CTE opportunities for all students.


**END THEME MODULE TEXT: Financial and Consumer Literacy**



## THEME MODULE: Health, Safety, and Wellness

**BEGIN THEME MODULE TEXT: Health, Safety, and Wellness**
Source file: `10 Reference/Standards/NYS ML CTE Theme Module 04 - Health, Safety, and Wellness.pdf` (NYS Middle-level CTE, June 2018, Preliminary Release for Field Review and Piloting; downloaded from nyctecenter.org). Page footers removed; wrapped lines rejoined; nothing else changed.

**New York State Middle-Level Career and Technical Education**  
**THEME MODULE TITLE: Health, Safety, and Wellness**  

### MODULE DESCRIPTION

This module introduces students to health-, safety-, and wellness-enhancing behaviors. Students will examine ways that personal choices and experiences affect their current wellness and long-term outcomes for themselves, their families, their workplaces, and the community. Risk factors that impact health, safety, and wellness and their relationships to current societal issues will be examined. Students will have the opportunity to explore the wide variety of career options in the health, safety, and wellness fields and identify the knowledge, skills, education, and training necessary for success in these fields.

### GUIDING QUESTION

What knowledge and skills are needed for individuals to consistently promote and practice safe and healthy behaviors that encourage wellness in home, school, workplace, and community setting?

### MODULE CONTENT

*Health, Safety, and Wellness*

#### 1. Health Practices
Students will
- a) Define physical health, social health, and mental/emotional health and describe how they interact as dimensions of overall wellness
- b) Describe how personal health behaviors and practices impact an individual's body systems
- c) Identify personal health practices that promote overall good health
- d) Explain how overall good health reduces an individual's risks for developing health issues
- e) Identify sources of health information and ways to determine the reliability of the information found
- f) Describe how an individual's health status impacts performance of tasks at home, at school, and in workplace and community settings
- g) List and explain strategies employers have instituted to promote health practices by employees in the workplace

#### 2. Disease Prevention
Students will
- a) Understand and be able to describe how behavioral choices can reduce the risk of contracting and spreading illness at home, at school, in the workplace, and in the community
- b) Demonstrate the use of prevention measures such as hand washing, sanitation and waste disposal, proper food handling and storage, and environmental controls to reduce disease risk
- c) Discuss how stress and poor emotional health can adversely affect the immune system
- d) List and explain strategies employers have instituted to reduce employee risk for contracting or spreading illness in the workplace
- e) Describe ways employee absence due to illness impacts the employee, coworkers, and the employer

#### 3. Personal Safety
Students will
- a) Explain how consistently practicing safe behaviors reduces the potential for, incidence of, and severity of injuries
- b) Tell why a particular behavior may be unsafe and how it could be amended to prevent injury
- c) Summarize common causes of intentional and unintentional injury and describe associated prevention strategies
- d) Explain how an orderly environment promotes reduction of accidents and injury
- e) Develop safety plans and practice emergency responses

#### 4. Classroom and Workplace Safety
Students will
- a) List and describe the purpose of safety rules specific to classroom and workplace settings
- b) Recognize potential hazards and explain accident prevention strategies specific to classroom and workplace settings
- c) Apply safety practices when using tools, machines, and equipment
- d) Wear appropriate protective clothing and gear when using tools, machines, and equipment
- e) Participate in housekeeping procedures that help to establish and maintain safe working conditions in the classroom or workplace
- f) Explain the purpose of Safety Data Sheets (SDS) for poisonous, toxic, or hazardous substances and know where to find them in the classroom or workplace
- g) Understand and follow preplanned procedures in the case of accident or emergency
- h) List the components of an accident report and explain the importance of preparing a thorough report should an accident occur in the classroom or workplace
- i) Demonstrate development of workplace safety skills through practice of these skills in a variety of classroom applications

#### 5. Social-Emotional Learning
Students will
- a) Discuss how personal habits, environment, and heredity affect social-emotional health
- b) Understand and explain ways social-emotional skills can lead to positive relationships in home, school, workplace, and community settings
- c) Label, understand, and apply strategies for managing emotions; feeling and showing empathy for others; making responsible decisions; and handling challenging situations
- d) Define "mental health"
- e) Identify school personnel with whom to discuss social, emotional, or mental health issues
- f) Identify school, workplace, and community resources providing services for individuals and families facing social, emotional, or mental health issues

#### 6. Stress Management
Students will
- a) Define "stress" and identify situations that contribute to stress
- b) Discuss how stress and poor emotional health can affect the immune system
- c) Recognize signs of stress and take steps to reduce its impact on overall wellness
- d) Research and practice techniques to manage stressful situations
- e) Assess the effectiveness of stress management techniques and determine steps to take to address stress if reduction is not achieved

#### 7. Careers in Health, Safety, and Wellness Fields
Students will
- a) Investigate knowledge, skills, and practices needed for a career in the healthcare, human services, and safety fields
- b) Analyze career paths within the healthcare, human services, and safety fields
- c) Evaluate personal skills, abilities, and interests for employment in the healthcare, human services, and safety fields

### ILLUSTRATIVE ACTIVITIES by CTE Content Area

Agricultural Education
Bacterial Growth Experiment
Students study food preservation and safety by experimenting with bacterial growth on a piece of white bread. Discuss the factors needed for bacterial growth and processes to minimize growth. Students place a slice of white bread without preservatives in a plastic bag and seal it. Place another slice in a condition using a food preservation technique such as drying, freezing, or salting. Compare bacterial growth on the samples at regular intervals for a 2-week period. Discuss the role of proper food handling in the prevention of disease.

Business and Marketing Education
Stress Management Role Plays
Divide the class into small groups. Give each group a workplace situation. Ask the groups to discuss how the situation might be stressful. Invite the groups to roleplay both a positive and a negative reaction to one of the stressful workplace situations.
Workplace situations might include:
A new boss is starting at the company next week
You have been late for work and your boss is not happy
The job you do is very repetitive and you feel bored
You work really hard but don’t think anyone notices your effort
You have a poor relationship with your colleagues
You have just been promoted

Family and Consumer Sciences Education
Nutrition and Health Claims
Students observe and note nutrition and health claims made on a variety of food packages for different types of food items. Students will arrange the foods from most healthy to least healthy based on the claims made on the packages. Students will research the meanings for nutrient or health claims as defined by the Nutrition Labeling and Education Act (NLEA). Then, students will decide whether they would like to rearrange the order of the foods based on their understanding of the definitions. Discuss the usefulness of nutrient and health claims found on food packaging.
Health Science Education
Disease Prevention in the Workplace

Students are asked to think about their school as their workplace and to consider ways their employer has instituted strategies to reduce their risk for contracting or spreading illness in their workplace. Students take a "Disease Prevention Walk" around their school and note ways disease prevention has been addressed. Examples might be hand sanitizer stations outside the cafeteria; hand-washing signs in restrooms; hands-free paper dispensers, etc. Discuss observations and then discuss and list strategies the school has not yet tried. Communicate the list to school leaders for future consideration.

Technology Education
Classroom and Workplace Safety Posters
Students develop safety posters that communicate how to use a tool or piece of equipment safely. Each poster should include a diagram or picture of the tool or piece of equipment, labeled to show both safety features and dangerous components. Students will present their posters at a time to coincide with when the tool or piece of equipment will be used in class. Classmates will be able to recognize potential hazards and explain accident prevention strategies specific to the tool or piece of equipment.

Trade and Technical Education
Safety Data Sheets
Students work in pairs to learn common chemical hazard vocabulary, using a teacher-highlighted Safety Data Sheet (SDS) for a common substance. Then, pairs of students will extract information from nonhighlighted SDS for five common household chemicals often found in the classroom. Student pairs will determine which of the studied chemicals they think is most dangerous and prepare an easy-to-understand safety sheet for classroom use.

### STANDARDS ADDRESSED

New York State Career Development and Occupational Studies (CDOS) Standards
Intermediate Level
http://www.p12.nysed.gov/cte/
Standard 1: Career Development
Students will be knowledgeable about the world of work, explore career options, and relate personal skills, aptitudes, and abilities to future career decisions
Standard 2: Integrated Learning
Students will demonstrate how academic knowledge and skills are applied in the workplace and other settings
Standard 3a: Universal Foundation Skills
Students will demonstrate mastery of the foundation skills and competencies essential for success in the workplace

Common Career Technical Core Standards
https://www.careertech.org/career-ready-practices
Career Ready Practices
1. Act as a responsible and contributing citizen and employee
3. Attend to personal health and financial well-being
5. Consider environmental, social, and economic impacts of decisions
8. Utilize critical thinking to make sense of problems and persevere in solving them

National Agricultural Education Standards
https://www.ffa.org/the council/afnr
CS.03 Examine and summarize the importance of health, safety, and environmental management systems in AFNR workplaces
AS.02.02 Analyze procedures to ensure that animal products are safe for consumption (e.g., use in the food system)
BS.02 NCAE Standard: Demonstrate proficiency by applying appropriate laboratory skills to complete tasks in a biotechnology research and development environment (e.g., standard operating procedures, record keeping, aseptic technique, equipment maintenance)
FPP.01. Develop and implement procedures to ensure safety, sanitation, and quality in food product and processing facilities
PST.02.02 Operate machinery and equipment while observing all safety precautions in AFNR settings
CRP.03. Attend to personal health and financial well-being
Note: National Agricultural Education Standards CRP .01-.12 coincide with Common Core Technical Core Standards

National Business Education Standards
https://www.nbea.org/newsite/curriculum/standards/index.html
Business Law
III. Agency and Employment Achievement Standard
Analyze the role and importance of agency law and employment law as they relate to the conduct of business
Career Development
I. Self-Awareness Achievement Standard
Assess personal skills, abilities, and aptitudes and personal strengths and weaknesses as they relate to career exploration and development
Management
IV. Personal Management Skills Achievement Standard
Develop personal management skills to function effectively and efficiently in a business environment

National Family and Consumer Sciences Standards
https://www.nasafacs.org/national-standards-and-competencies.html
1.0 Career, Community, and Family Connections
Integrate multiple life roles and responsibilities in family, work, and community settings
1.2 Demonstrate transferable knowledge, attitudes, technical and employability skills in school, community, and workplace settings
1.2.7 Analyze factors that contribute to maintaining safe and healthy school, work, and community environments
9.0 Food Science, Dietetics, and Nutrition
Integrate knowledge, skills, practices required for careers in food science, food technology, dietetics, and nutrition
9.2 Apply risk management procedures to food safety, food testing, and sanitation
14.0 Nutrition and Wellness
Demonstrate nutrition and wellness practices that enhance individual and family well-being
14.1 Analyze factors that influence nutrition and wellness practices across the life span.
14.1.1 Explain physical, emotional, social, psychological, cultural, and spiritual components of individual and family wellness.

National Consortium for Health Science Education
https://www.healthscienceconsortium.org/national-health-science-standards/
Foundation Standard 7: Safety Practices
Identify existing and potential hazards to clients, co-workers, and self. Employ safe work practices and follow health and safety policies and procedures to prevent injury and illness.
7.1 Infection Control
7.11 Explain principles of infection control
7.12 Differentiate methods of controlling the spread and growth of microorganisms.
7.2 Personal Safety
7.21 Apply personal safety procedures based on Occupational Safety and Health Administration (OSHA) and Centers for Disease Control (CDC) regulations
7.22 Demonstrate principles of body mechanics.
7.3 Environmental Safety
7.31 Apply safety techniques in the work
7.4 Common Safety Hazards
7.41 Observe all safety standards related to the Occupational Exposure to
Hazardous Chemicals Standard
7.42 Comply with safety signs, symbols, and labels
7.5 Emergency Procedures and Protocols
7.52 Apply principles of basic emergency response in natural disasters and other emergencies Foundation Standard 9: Health Maintenance Practices Differentiate between wellness and disease. Promote disease prevention and model healthy behaviors.
9.1 Healthy Behaviors
9.11 Promote behaviors of health and wellness (such as: nutrition, weight control, exercise, sleep habits).
9.12 Describe strategies for prevention of disease.
9.13 Investigate complementary and alternative health practices as they relate to wellness and disease prevention

International Technology and Engineering Educators Association
Standards for Technological Literacy
https://www.iteea.org/39197.aspx
The Nature of Technology
2. Students will develop an understanding of the core concepts of technology
U. Maintenance is the process of inspecting and servicing a product or system on a regular basis in order for it to continue functioning properly, to extend its life, or to upgrade its capacity
Technology and Society
4. Students will develop an understanding of the cultural, social, economic, and political effects of technology
D. The use of technology affects humans in many ways, including their safety, comfort, choices, and attitudes about technology's development and use
Abilities for a Technological World
12. Students will develop the abilities to use and maintain technological products and systems
I. Use tools, materials, and machines to safely diagnose, adjust, and repair systems
The Designed World
14. Students will develop an understanding of and be able to select and use medical technologies
G. Advances and innovations in medical technologies are used to improve healthcare
H. Sanitation processes used in the disposal of medical products help to protect people from harmful organisms and disease, and shape ethics of modern society
I. The vaccines developed for use in immunization require specialized technologies to support environments in which sufficient amounts of vaccines are produced
15. Students will develop an understanding of and be able to select and use agricultural and related biotechnologies
J. The development of refrigeration, freezing, dehydration, preservation, and irradiation provide long-term storage of food and reduce health risks caused by tainted food

USDOE Employability Skills
http://cte.ed.gov/employability skills/
Applied Knowledge: Applied Academic Skills, Critical Thinking Skills
The thoughtful integration of academic knowledge and technical skills put to practical use
Effective Relationships: Interpersonal Skills, Personal Qualities
The skills that enable individuals to interact effectively with clients, coworkers, and supervisors
Workplace Skills: Resource Management, Information Use, Communication Skills, Systems Thinking, Technology Use
The skills employees need to successfully perform work tasks

### RESOURCES

New York State Education Department
Office of Student Support Services
Educating the Whole Child, Engaging the Whole School: Guidelines and Resources for Social and
Emotional Development and Learning (SEDL) in New York State
http://www.p12.nysed.gov/sss/documents/SEDLguidelines.pdf
Social and Emotional Development and Learning (SEDL) Guidelines offer school districts compelling information, example, and evidence of SEDL in elementary and secondary school education programs. This guidance document aims to give New York state school communities a rationale and the confidence to address child and adolescent affective development.

New York Center for Agricultural Medicine and Health (NYCAMH)
http://www.nycamh.org
NYCAMH is a New York state and NIOSH designated center for occupational disease and injury prevention research as well as the provider of occupationally related physical and mental health services to farmers and families in the rural Northeast. The National Agricultural Safety Database (NASD) has a collection of publications about agricultural safety and health.

New York Committee for Occupational Safety and Health (NYCOSH)
http://www.nycosh.org
Young Workers Program develops Peer Leaders to train young people about their workplace rights, safety and health. Programs also train teachers, parents and employers on how to protect the safety and health of young workers.

United States Department of Labor
Occupational Safety and Health Administration (OSHA)
https://www.osha.gov/dte/
OSHA provides free training materials such as publications, videos, and other assistance to help employers protect workers against accidents and injuries.

Centers for Disease Control and Prevention (CDC)
https://www.cdc.gov
The CDC Learning Connection is a resource for information about public health training developed by CDC, CDC partners, and other federal agencies. Through website features, social media, and an e-newsletter, the CDC Learning Connection provides information about training opportunities, including many that offer free continuing education.

Career and Technical Education Technical Assistance Center of New York (CTE TAC)
http://nyctecenter.org/
The Career and Technical Education Technical Assistance Center (CTE TAC) operates under a state contract to assist the New York State Education Department (NYSED) in carrying out its mission of improving the quality, access, and delivery of career and technical education through research-based methods and strategies resulting in broader CTE opportunities for all students.


**END THEME MODULE TEXT: Health, Safety, and Wellness**



## THEME MODULE: Problem Solving and Innovation

**BEGIN THEME MODULE TEXT: Problem Solving and Innovation**
Source file: `10 Reference/Standards/NYS ML CTE Theme Module 05 - Problem Solving and Innovation.pdf` (NYS Middle-level CTE, June 2018, Preliminary Release for Field Review and Piloting; downloaded from nyctecenter.org). Page footers removed; wrapped lines rejoined; nothing else changed.

**New York State Middle-Level Career and Technical Education**  
**THEME MODULE TITLE: Problem Solving and Innovation**  

### MODULE DESCRIPTION

This module introduces students to problem-solving methods and research. Problem solving can be proactive through design or reactive through troubleshooting. This module will relate invention and innovation to problem solving processes. Students will learn to acquire, critically evaluate, and apply the products of research to make informed problem-solving decisions. Problem-solving skills are essential for all students to develop; they can use formal, iterative, and systemic approaches to solve real-world problems. Current issues related to problem-solving processes, research processes, information access, and information literacy will be examined. Students will have the opportunity to explore the wide variety of career options related to technological invention, innovation, and research and identify the knowledge, skills, education, and training necessary for success within these fields.

### GUIDING QUESTION

What knowledge and skills are necessary to demonstrate introductory understanding of the application of problem-solving processes and the acquisition, evaluation, and application of the products of research for informed decision making?

### MODULE CONTENT

*Problem Solving and Innovation*

#### 1. Problem Solving
Students will
- a) Describe the scientific method of inquiry as it relates to real-world problem solving
- b) Define technological problem solving in the context of design and troubleshooting
- c) Define invention as new designs for technologies and systems
- d) Define innovation as new applications for existing technologies and systems
- e) Demonstrate personal development of problem-solving skills through practice of these skills in a variety of classroom applications

#### 2. Design Process (Proactive)
Students will
- a) Implement a formal design process to solve a given problem by
    - a. Defining the problem being addressed
    - b. Defining criteria that must be met through the finished design
    - c. Defining constraints that must be adhered to
    - d. Brainstorming and examining possible solutions
    - e. Selecting the best solution for evaluation
    - f. Developing and constructing a prototype or model of the selected design
    - g. Testing and evaluating the prototype and model against the design criteria and constraints
    - h. Optimizing the solution for best form and function
    - i. Evaluating their use of the design process and how it impacted their final solutions
- b) Demonstrate personal development of design skills through practice of these skills in a variety of classroom applications

#### 3. Troubleshooting Process (Reactive)
Students will
- a) Implement a formal troubleshooting process to solve a given problem by
    - a. Defining the problem being addressed
    - b. Identifying criteria and specifications for the desired outcomes or operation
    - c. Testing and evaluating to isolate the problem
    - d. Correcting the problem by implementing changes or repairs
    - e. Validating that the corrective action produced desired outcomes or operation
    - f. Identifying strategies to prevent future problems
- b) Demonstrate personal development of troubleshooting skills through practice of these skills in a variety of classroom applications

#### 4. Research Applications in CTE
Students will
- a) Locate and gather information about a problem by
    - a. Defining the problem being researched
    - b. Utilizing search tools to locate information, data, or reference materials
    - c. Implementing search-refinement tools (such as Boolean functions and keywords to narrow results)
    - d. Saving, archiving, or bookmarking information sources for future retrieval
- b) Evaluate information sources for value and applicability toward a problem, by:
    - a. Identifying the source of the information, data, and reference material
    - b. Evaluating the source to determine if the author(s) or publisher can be considered an authoritative source for the desired content
    - c. Evaluating the value of the of research sources toward a given problem
- c) Apply the products of research for informed decisions by
    - a. Locating and retrieving information, data, or reference materials to be applied to a given problem
    - b. Applying the research sources for decision making when solving a given problem
    - c. Rationalizing the selection of sources used in problem solving when differing or conflicting sources are found
    - d. Crediting information sources when documenting the results of a problem-solving effort
- d) Demonstrate personal development of research application skills through practice of these skills in a variety of classroom applications

#### 5. Careers in Problem Solving, Invention, and Innovation
Students will
- a) Investigate knowledge, skills, and practices needed for a career utilizing problem solving, invention, and innovation skills

- b) Analyze career paths requiring skills for problem solving, invention, and innovation
- c) Evaluate personal skills, abilities, and interests for employment opportunities utilizing skills for problem solving, invention, and innovation

### ILLUSTRATIVE ACTIVITIES by CTE Content Area

Agricultural Education
Faulty System
Students identify a system that is not functioning properly. Students observe, identify and document the individual system components, how they operate, and how they interact. Students locate the system component that is not functioning, implement a change or repair, and evaluate the system to ensure that it is functioning properly. Students document the repair and propose preventive maintenance solutions.

Business and Marketing Education
Common Computer Problems
Prepare a list of the most common computer and technology problems students encounter in class daily. Divide the class into small teams. Pass out copies of the common problems. Have each team complete a troubleshooting process and prepare a write-up showing how to solve one of the common problems. Have a different team apply the solution to determine whether the corrective action solved the problem and led to the desired outcome.

Family and Consumer Sciences Education
Reworking Spaces
Students work with the school leaders to identify areas in their school that are not functioning well due to space issues. Examples might be slow-moving cafeteria lines, overcrowded storage areas for sports, or music equipment, lack of classroom space for group work, etc. Students apply the design process to create plans to rework the spaces to improve functioning. Students present their interior design plans to school leaders for consideration and possible implementation.

Health Science Education
Medical Inventions
Students identify medical inventions that have had an impact on human life. Students research information on how the invention was developed and what desirable and undesirable impacts it created. Students create a report and/or presentation that includes multiple information sources.

Technology Education
Developing Prototypes
Students identify a problem that requires a designed solution such as a new product that can be made from recycled materials. Students develop a problem statement, constraints and parameters, and proposed solutions. Students develop a model or prototype for testing and optimization, record the process, and present results. Examples of design problems could include a structure, a household item, a planting container, or others.

Trade and Technical Education
Brand Logos
Students define the term "branding" and examine the role of the graphic designer in the development of brand logos. Students will trace the design changes in a company's logo over time and research company innovations that led to these design changes.

### STANDARDS ADDRESSED

New York State Career Development and Occupational Studies (CDOS) Standards
Intermediate Level
http://www.p12.nysed.gov/cte/
Standard 1: Career Development
Students will be knowledgeable about the world of work, explore career options, and relate personal skills, aptitudes, and abilities to future career decisions
Standard 2: Integrated Learning
Students will demonstrate how academic knowledge and skills are applied in the workplace and other settings
Standard 3a: Universal Foundation Skills
Students will demonstrate mastery of the foundation skills and competencies essential for success in the workplace

Common Career Technical Core Standards
https://www.careertech.org/career-ready-practices
Career Ready Practices
1. Act as a responsible and contributing citizen and employee
2. Apply appropriate and academic and technical skills
4. Communicate clearly and effectively and with reason
5. Consider environmental, social, and economic impacts of decisions
6. Demonstrate creativity and innovation
7. Employ valid and reliable research strategies
8. Utilize critical thinking to make sense of problems and persevere in solving them
11. Use technology to enhance productivity
12. Work productively in teams while using cultural global competence

National Agricultural Education Standards
https://www.ffa.org/the council/afnr
PST.01 Apply physical science principles and engineering applications to solve problems and improve performance AFNR power, structural, and technical systems
CRP.02 Apply appropriate academic and technical skills
CRP.06 Demonstrate creativity and innovation
CRP.07 Employ valid and reliable research strategies
CRP.08 Utilize critical thinking to make sense of problems and persevere in solving them
CRP.11 Use technology to enhance productivity
Note: National Agricultural Education Standards CRP .01-.12 coincide with Common Core Technical Core Standards

National Business Education Standards
https://www.nbea.org/newsite/curriculum/standards/index.html
Computation
I. Mathematical Foundations Achievement Standard
Apply basic mathematical operations to solve problems
II. Number Relationships and Operations Achievement Standard Solve problems involving whole numbers, decimals, fractions, percents, ratios, averages, and proportions
III. Patterns, Functions, and Algebra
Use algebraic operations to solve problems
V. Measurements Achievement Standard
Use common international standards of measurement when solving problems
V. Statistics and Probability Achievement Standard
Analyze and interpret data using common statistical procedures
VI. Problem-Solving Applications Achievement Standard
Use mathematical procedures to analyze and solve business problems

National Family and Consumer Sciences Standards
https://www.nasafacs.org/national-standards-and-competencies.html
3.0 Consumer Services
Integrate knowledge, skills, and practices needed for a career in consumer services
3.5 Demonstrate skills needed for product development, testing, and presentation
3.5.1 Conduct market research to determine consumer trends and product development needs
3.5.2 Design or analyze a consumer product
3.5.3 Analyze features, prices, product information, styles, and performance of consumer goods for potential global impact and trade-offs among the components
11.0 Housing and Interior Design
Integrate knowledge, skills, and practices needed for a career in housing and interior design
11.3 Apply residential and commercial interior design knowledge, skills and processes to meet specific design needs
11.3.6 Demonstrate design processes such as determining the scope of the project, programming, research, concept development, schematic design, design drawing, and design development and presentation
11.5 Analyze design and development of architecture, interiors, and furnishings through the ages
11.5.5 Predict future design and development trends in architecture, interiors, and furnishings
16.0 Textiles, Fashion, and Apparel
Integrate knowledge, skills, and practices needed for a career in textiles, fashion, and apparel
16.3 Demonstrate textiles, fashion, and apparel design skills
16.3.4 Demonstrate design concepts using fiber, fabric, or digital means, employing draping and/or flat pattern making techniques

16.3.7 Demonstrate ability to use technology for fashion, apparel, and textile design

National Consortium for Health Science Education
https://www.healthscienceconsortium.org/national-health-science-standards/
Foundation Standard 11: Information Technology Applications
Utilize and understand information technology applications common across health professions
11.3 Basic Computer Skills
11.31 Apply basic computer concepts and terminology necessary to use computers and other mobile devices
11.32 Demonstrate basic computer troubleshooting procedures
11.33 Demonstrate use of file organization and information storage
11.34 Identify uses of basic word processing, spreadsheet, and database applications
11.35 Evaluate validity of web-based resources

International Technology and Engineering Educators Association
Standards for Technological Literacy
https://www.iteea.org/39197.aspx
Design
8. Students will develop an understanding of the attributes of design
E. Design is a creative planning process that leads to useful products and systems
F. There is no perfect design
G. Requirements for a design are made up of criteria and constraints
9. Students will develop an understanding of engineering design
F. Design involves a set of steps which can be performed in different sequences and repeated as needed
G. Brainstorming is a group problem-solving design process in which each person in the group presents his or her ideas in an open forum
H. Modeling, testing, evaluating, and modifying are used to transform ideas into practical solutions
10. Students will develop an understanding of the role of troubleshooting, research and development, invention, innovation, and experimentation in problem solving
F. Troubleshooting is a problem-solving method used to identify the cause of a malfunction in a technological system
G. Invention is a process of turning ideas and imagination into devices and systems. Innovation is the process of modifying an existing product or system to improve it
H. Some technological problems are best solved through experimentation
Abilities for a Technological World
11. Students will develop abilities to apply the design process
H. Apply a design process to solve problems in and beyond the laboratory-classroom
I. Specify criteria and constraints for the design
J. Make two-dimensional and three-dimensional representations of the designed solution
K. Test and evaluate the design in relation to pre-established requirements, such as criteria and constraints, and refine as needed
L. Make a product or system and document the solution

USDOE Employability Skills
http://cte.ed.gov/employability skills/
Applied Knowledge: Applied Academic Skills, Critical Thinking Skills
The thoughtful integration of academic knowledge and technical skills put to practical use
Effective Relationships: Interpersonal Skills, Personal Qualities
The skills that enable individuals to interact effectively with clients, coworkers, and supervisors
Workplace Skills: Resource Management, Information Use, Communication Skills, Systems Thinking, Technology Use
The skills employees need to successfully perform work tasks

### RESOURCES

United States Department of Education
Green Strides: Environment, Health, and Facilities at ED
STEM Programs at ED
https://www2.ed.gov/about/inits/ed/green-strides/stem.html
Federal resources are helping to assist educators in implementing effective approaches for improving STEM teaching and learning; facilitating the dissemination and adoption of effective STEM instructional practices nationwide; and promoting STEM education experiences that prioritize hands-on learning to increase student engagement and achievement.

Brookings Institute
Teaching problem solving: Let students get 'stuck' and 'unstuck'
https://www.brookings.edu/blog/education-plus-development/2017/10/31/teaching-problem-
solving-let-students-get-stuck-and-unstuck/
This is a resource describing ways to create a classroom culture of problem solvers.

TEDEd
https://ed.ted.com/lessons?category=problem-solving
TEDEd has an extensive website section dedicated to problem solving skills including videos and interactive tasks. Teachers can use these free materials as resources to build lessons for their individual CTE classrooms.

The Henry Ford
https://www.thehenryford.org/education/teaching-innovation/innovation-101/
Online education modules that combine lesson plans and active teaching and learning resources, including oral history interviews, to ignite the imagination of future innovators.

Career and Technical Education Technical Assistance Center of New York (CTE TAC)
http://nyctecenter.org/
The Career and Technical Education Technical Assistance Center (CTE TAC) operates

under a state contract to assist the New York State Education Department (NYSED) in carrying out its mission of improving the quality, access, and delivery of career and technical education through research-based methods and strategies resulting in broader CTE opportunities for all students.


**END THEME MODULE TEXT: Problem Solving and Innovation**



## THEME MODULE: Sustainability

**BEGIN THEME MODULE TEXT: Sustainability**
Source file: `10 Reference/Standards/NYS ML CTE Theme Module 06 - Sustainability.pdf` (NYS Middle-level CTE, June 2018, Preliminary Release for Field Review and Piloting; downloaded from nyctecenter.org). Page footers removed; wrapped lines rejoined; nothing else changed.

**New York State Middle-Level Career and Technical Education**  
**THEME MODULE TITLE: Sustainability**  

### MODULE DESCRIPTION

This module introduces students to ways in which the environment is impacted by humans and their activities. Humans will always need resources to live. Sustainability refers to the rate of use of resources such that consumption can continue without damaging the environment. Students will examine the resources they use, how they use them, and ways to conserve and preserve resources for future generations. Current issues related to natural resource management, renewable energies, and sustainable practices will be examined. Students will have the opportunity to explore the wide variety of career options related to sustainability and identify the knowledge, skills, education, and training necessary for success within these fields.

### GUIDING QUESTION

What knowledge and skills are necessary to evaluate the long-term effects of personal practices on the environment and to demonstrate introductory understanding of how to use and conserve resources to meet human needs while minimizing harm to the environment?

### MODULE CONTENT

*Sustainability*

#### 1. Resources
Students will
- a) Define "sustainability" as it applies to resource use
- b) Explain how sustainability can be a factor in decision making
- c) Define and give example of renewable and non-renewable resources
- d) Explain factors to consider when evaluating environmental implications of decisions
- e) Investigate practices that promote stewardship of environmental resources
- f) Research the personal, environmental, and financial costs and benefits of sustainability-conscious decisions to individuals, families, schools, workplaces and communities
- g) Practice making decisions that show consideration for sustainability of resources in a variety of classroom applications

#### 2. Environmental Management
Students will
- a) Explain the concept of “carbon footprint”
- b) Explain how individual choices impact the availability and quality of natural resources in the community
- c) Describe ways individuals can adjust behaviors to minimize the impact of their choices on the environment
- d) Describe ways values affect one's evaluation of the need for change of personal behaviors that impact the environment
- e) Explain factors to consider when assessing the environmental impact of purchasing decisions for everyday goods
- f) Explain factors to consider when assessing the environmental impact of housing decisions
- g) Explain factors to consider when assessing the environmental impact of transportation decisions
- h) Explain factors to consider when assessing the environmental impact of food choices
- i) Describe the impacts of pollution on the availability and quality of natural resources
- j) Examine the impacts of landfills, including toxins, leachate, and greenhouse gases, on the global community
- k) Describe the impacts of climate change on the availability and quality of natural resources
- l) Research local, state, national, and global governmental regulations that were enacted to protect natural resources

#### 3. Energy Conservation
Students will
- a) List and describe energy sources used to power homes, school, workplaces, and communities
- b) Categorize energy sources as renewable or nonrenewable
- c) Understand and explain how individuals can limit the use of nonrenewable resources by reducing, reusing, and recycling
- d) Define "conservation" as it applies to energy
- e) List and describe methods for energy conservation in the home, workplace, and community
- f) Describe how energy conservation strategies are multifaceted and continually changing
- g) Research the effects of energy shortages on the community
- h) Practice energy conservation through a variety of classroom applications

#### 4. Careers Related to Sustainability
Students will
- a) Investigate knowledge, skills, and practices needed for careers related to sustainability or for employment in settings that utilize sustainable practices
- b) Analyze career paths within the natural resources, environmental management, and energy conservation fields
- c) Evaluate personal skills, abilities, and interests for employment in the natural resources, environmental management, and energy conservation fields

### ILLUSTRATIVE ACTIVITIES by CTE Content Area

Agricultural Education
Composting School Food Waste
Students will conduct action research in the school cafeteria to determine the amount of food waste generated by students during lunch periods. Students will research methods for reducing food waste and for utilizing food waste through composting. Students can investigate the use of the compost in a school garden to grow vegetables to serve in the cafeteria.
Business and Marketing Education
Sustainable Business Practices

Students will conduct research and prepare virtual brochures on sustainable business practices and how these practices attract new employees. Brochures can include profiles of local or national businesses that promote sustainability and show how these businesses infuse sustainability into daily work activities, training programs, reward systems, and operational practices and objectives. Students can share their brochures through the school intranet.

Family and Consumer Sciences Education
Product Lifecycles
Students will identify a commonly used household item and investigate the full product lifecycle. They will include the source of the materials used to make the product, the useable life of the product, and ways the product can be safely recycled or repurposed for a new use. Students will discuss the impacts on community resources from initial creation to disposal and apply this learning to a recycle/upcycle/repurposing project, such as recycling t-shirts into reusable shopping bags.

Health Science Education
Environmental Healthcare Workers
Students prepare questions in preparation for a guest speaker on resource management and energy conservation in healthcare facilities. Invite an environmental healthcare worker to speak with students about the ways healthcare facilities utilize sustainable practices, such as through lighting options; selection and care of textiles; and selection, cleaning, and disposal of tools and implements. Discuss ways the need for patient safety and disease control affect the environmental management decisions in a healthcare facility.

Technology Education
Renewable Energy Technologies
Students will research technologies that promote renewable energy. Students design and build examples such as windmills, solar ovens, and photovoltaic models to demonstrate and test how renewable energy can be collected and used to produce power. Discuss the benefits and challenges of implementing these renewable energy technologies on a large scale to provide power to the community.

Trade and Technical Education
Sustainable Garden Plans
Small teams of students will practice the conversion of feet to paces. They will use this skill to form a calculation of bearing in square, triangular, and irregular land plots. Students will research average growth rates, harvest yield, and footprint of native plants. Each team will design and present a sustainable garden to use in a given plot.

### STANDARDS ADDRESSED

New York State Career Development and Occupational Studies (CDOS) Standards
Intermediate Level
http://www.p12.nysed.gov/cte/
Standard 1: Career Development
Students will be knowledgeable about the world of work, explore career options, and relate personal skills, aptitudes, and abilities to future career decisions
Standard 2: Integrated Learning
Students will demonstrate how academic knowledge and skills are applied in the workplace and other settings
Standard 3a: Universal Foundation Skills
Students will demonstrate mastery of the foundation skills and competencies essential for success in the workplace

Common Career Technical Core Standards
https://www.careertech.org/career-ready-practices
Career Ready Practices
1. Act as a responsible and contributing citizen and employee
2. Apply appropriate and academic and technical skills
3. Attend to personal health and financial well-being
5. Consider environmental, social, and economic impacts of decisions
6. Demonstrate creativity and innovation
8. Utilize critical thinking to make sense of problems and persevere in solving them
9. Model integrity, ethical leadership, and effective management
11. Use technology to enhance productivity
12. Work productively in teams while using cultural global competence

National Agricultural Education Standards
https://www.ffa.org/the council/afnr
CS.03. Examine and summarize the importance of health, safety and environmental management systems in AFNR workplaces
CS.04. Demonstrate stewardship of natural resources in AFNR activities
CS.06. Analyze the interaction among AFNR systems in the production, processing and management of food, fiber and fuel and the sustainable use of natural resources
AS.08. Analyze environmental factors associated with animal production
ESS.02. Evaluate the impact of public policies and regulations on environmental service system operations
ESS.03. Develop proposed solutions to environmental issues, problems and applications using scientific principles of meteorology, soil science, hydrology, microbiology, chemistry and ecology.
ESS.04. Demonstrate the operation of environmental service systems (e.g., pollution control, water treatment, wastewater treatment, solid waste management and energy conservation)
NRS.01. Plan and conduct natural resource management activities that apply logical, reasoned and scientifically based solutions to natural resource issues and goals
NRS.02.01. Analyze the interrelationships between natural resources and humans
NRS.03. Develop plans to ensure sustainable production and processing of natural resources
NRS.04. Demonstrate responsible management procedures and techniques to protect, maintain, enhance, and improve natural resources
PS.01. Develop and implement a crop management plan for a given production goal that accounts for environmental factors
CRP.05. Consider the environmental, social and economic impacts of decisions
Note: National Agricultural Education Standards CRP .01-.12 coincide with Common Core Technical Core Standards

National Business Education Standards
https://www.nbea.org/newsite/curriculum/standards/index.html
Economics
I. Allocation of Resources Achievement Standard
Assess opportunity costs and trade-offs involved in making choices about how to use scarce economic resources
VI. Productivity Achievement Standard
Explain the importance of productivity and analyze how specialization, division of labor, investment in physical and human capital, and technological change affect productivity and global trade
International Business
II. The Global Business Environment Achievement Standard
Describe the interrelatedness of the social, cultural, political, legal, and economic factors that shape and impact the global business environment
IV. Global Business Ethics and Social Responsibility Achievement Standard Describe the factors that define what is considered ethical and socially responsible business behavior in a global business environment
Management
V. Ethics Achievement Standard
Examine the role of ethics and social responsibility in decision making

National Family and Consumer Sciences Standards
https://www.nasafacs.org/national-standards-and-competencies.html
3.0 Consumer Services
Integrate knowledge, skills, and practices needed for a career in consumer services
3.4 Analyze resource consumption for conservation and waste management practices
3.4.1 Investigate sources and types of residential and commercial energy, water policy and usage, waste disposal, and pollution issues
3.4.2 Evaluate local, state, and national consumer programs and services, both private and government, to recycle and conserve energy and environmental resources
3.4.3 Explore a variety of strategies and practices to conserve energy and reduce waste
3.4.4 Examine waste management issues and local, national, international, and global issues
3.4.5 Examine roles of government, culture, industry, and family in energy consumption

National Consortium for Health Science Education
https://www.healthscienceconsortium.org/national-health-science-standards/
3.1 Healthcare Delivery Systems
3.13 Assess the impact of emerging issues on healthcare delivery systems
7.3 Environmental Safety
7.31 Apply safety techniques in the work environment

International Technology and Engineering Educators Association
Standards for Technological Literacy

https://www.iteea.org/39197.aspx
Technology and Society
4. Students will develop an understanding of the cultural, social, economic, and political effects of technology
D. The use of technology affects humans in various ways, including their safety, comfort, choices, and attitudes about technology’s development and use
E. Technology, by itself, is neither good nor bad, but decisions about the use of products and systems can result in desirable or undesirable consequences
G. Economic, political, and cultural issues are influence by the development and use of technology
5. Students will develop an understanding of the effects of technology on the environment
D. The management of waste produced by technological systems is an important social issue
F. Decisions to develop and use technologies often put environmental and economic concerns in direct competition with one another

USDOE Employability Skills
http://cte.ed.gov/employability skills/
Applied Knowledge: Applied Academic Skills, Critical Thinking Skills
The thoughtful integration of academic knowledge and technical skills put to practical use
Effective Relationships: Interpersonal Skills, Personal Qualities
The skills that enable individuals to interact effectively with clients, coworkers, and supervisors
Workplace Skills: Resource Management, Information Use, Communication Skills, Systems Thinking, Technology Use
The skills employees need to successfully perform work tasks

### RESOURCES

Cornell Cooperative Extension
Agriculture and Food Systems
http://cce.cornell.edu/programs
Cornell Cooperative Extension links the research and extension efforts at Cornell University, the Cornell University Agricultural Experiment Station and the New York State Agricultural Experiment Station, providing the knowledge to maximize New York State’s agricultural and natural resources. CCE's regional agriculture teams provide research-based information, programs, and technical assistance all around the state.

New York State Energy Research and Development Authority (NYSERDA)
https://www.nyserda.ny.gov/
NYSERDA offers objective information and analysis, innovative programs, technical expertise and support to help increase energy efficiency, save money, use renewable energy, and reduce reliance on fossil fuels.

United States Department of Agriculture

Office of the Chief Economist
https://www.usda.gov/oce/sustainable/
USDA seeks to balance the goals of satisfying human needs; enhancing environmental quality, the resource base, and ecosystem services; sustaining the economic viability of agriculture; enhancing the quality of life for farmers, ranchers, forest managers, workers, and society as a whole. USDA also supports the principles of “reduce, reuse, and recycle” in relation to efficient product handling, processing, transportation, packaging, trade, consumption and waste management.
Office of Community Food Systems
https://www.fns.usda.gov/farmtoschool/farm-school
The Food and Nutrition Service has seven regional offices around the country; in each is a Farm to School Regional Lead available to provide farm to school related support.
University of Colorado, Boulder
https://phet.colorado.edu/en/simulations/category/new
PhET provides fun, free, interactive, research-based simulations. PhET tests and evaluates each simulation to ensure educational effectiveness. The simulations are written in Java, Flash, or HTML5, and can be run online or downloaded to a computer. All simulations are open source resources that are free to all students and teachers.

United States Environmental Protection Agency (EPA)
Environmental Education
https://www.epa.gov/education/environmental-education-ee-publications#resources
The Environmental Protection Agency provides environmental science research, education, and assessment information. The mission of the EPA is to protect human health and the environment. EPA has 10 regional offices across the country; New York is in Region 2. The Regional Environmental Education Coordinator in each area can provide information and resources about local environmental issues and EPA programs.

United States Composting Council (USCC)
Composting for Teachers and Students
https://compostingcouncil.org/composting-for-teachers-and-students/
The US Composting Council is involved in research, training, and public education on composting and compost standards. The USCC provides free resources and educational materials.

Career and Technical Education Technical Assistance Center of New York (CTE TAC)
http://nyctecenter.org/
The Career and Technical Education Technical Assistance Center (CTE TAC) operates under a state contract to assist the New York State Education Department (NYSED) in carrying out its mission of improving the quality, access, and delivery of career and technical education through research-based methods and strategies resulting in broader CTE opportunities for all students.


**END THEME MODULE TEXT: Sustainability**
