export type ExerciseMeta = {
  id: string;
  title: string;
  route: string;
  type: 'text' | 'table' | 'two-column';
  props?: {
    multiline?: boolean;
    placeholder?: string;
    required?: boolean;
    headers?: string[]; // for tables
    rows?: number; // for tables
    columns?: number; // for tables (optional if headers provided)
    subTitle?: string; // for table exercises
    description?: string; // for table exercises
    leftColumn?: {
      title: string;
      description?: string;
      fields: Array<{
        label: string;
        placeholder: string;
        required?: boolean;
      }>;
    };
    rightColumn?: {
      title: string;
      description?: string;
      fields: Array<{
        label: string;
        placeholder: string;
        required?: boolean;
      }>;
    };
  };
};

// Inferred order from Miro: adjust titles/props as needed when final copy is ready
export const exercisesMeta: ExerciseMeta[] = [
  { 
    id: 'courseInfo', 
    title: 'Course Information', 
    route: '/exercise/course-info', 
    type: 'two-column', 
    props: { 
      leftColumn: {
        title: 'The course',
        description: 'Select a course in which you could be a teacher. You may choose a course from university curricula (e.g. see link to University of Helsinki\'s courses) or think about your own course that you\'re currently teaching.',
        fields: [
          { label: 'name', placeholder: 'Type your answer here max 50 word', required: true },
          { label: 'scope', placeholder: 'Type your answer here max 50 word', required: true }
        ]
      },
      rightColumn: {
        title: 'Target students',
        fields: [
          { label: 'targetStudents', placeholder: 'Type your answer here max 50 word', required: true },
          { label: 'studentsSkillLevel', placeholder: 'Type your answer here max 50 word', required: true }
        ]
      }
    } 
  },
  { 
    id: 'learningObjectives', 
    title: 'Learning Objectives', 
    route: '/exercise/learning-objectives', 
    type: 'two-column', 
    props: { 
      leftColumn: {
        title: 'Intended learning outcomes',
        description: '1. Define the intended learning outcomes. Consider knowledge, skills, core competencies, key skills, scientific/knowledge, and skills-related outcomes.\n\n2. Ask the Chatbot for feedback using the following prompt: "Please comment how the intended learning outcomes of my course could be improved. Please make sure that my intended learning outcomes use the following structure: Upon completing the course + student is able to + Bloom\'s taxonomy action verb + object and context. Give suggestions for the Bloom\'s taxonomy action verbs. Next. I will paste the text that you should comment."\n\n3. Finalize the outcomes, being critical of AI-based feedback.',
        fields: [
          { label: 'learningOutcomes', placeholder: 'Type your answer here max 150 word', required: true }
        ]
      },
      rightColumn: {
        title: 'Chat with the course Chatbot',
        fields: []
      }
    } 
  },
  { 
    id: 'coreContent', 
    title: 'Core Content', 
    route: '/exercise/core-content', 
    type: 'two-column', 
    props: { 
      leftColumn: {
        title: 'Core content',
        description: 'Analyse the content of the course you are planning. You can use any categorization that suits the best for your purposes or use a template as the one shown in the course. Write in the box below the core content of the course. Make sure you are using scaffolding principles when deciding the order of your content.',
        fields: [
          { label: 'coreContentLeft', placeholder: 'Type your answer here max 50 word', required: true }
        ]
      },
      rightColumn: {
        title: '',
        fields: [
          { label: 'coreContentRight', placeholder: 'Type your answer here max 50 word', required: true }
        ]
      }
    } 
  },
  { 
    id: 'teachingMethods', 
    title: 'Teaching methods', 
    route: '/exercise/teaching-methods', 
    type: 'table', 
    props: { 
      subTitle: 'Teaching methods',
      description: 'For each of the intended learning outcomes (ILO) write down: a) what kind of active teaching methods would support your students attaining of the ILO, b) what students are doing/what are the concrete actions that students do when you apply your teaching method.',
      headers: ['Intended learning outcomes', 'Teaching methods', 'Assessment methods'],
      rows: 4
    } 
  },
  { 
    id: 'assessmentMethods', 
    title: 'Assessment methods', 
    route: '/exercise/assessment-methods', 
    type: 'table', 
    props: { 
      subTitle: 'Course alignment',
      description: 'Based on the ILO, content and teaching methods of your course, which assessment methods would be suitable and why? List the assessment methods that correspond to each ILO below and explain your choices.',
      headers: ['Intended learning outcomes', 'Teaching methods', 'Assessment methods'],
      rows: 4
    } 
  },
  { 
    id: 'gradingCriteriaReflection', 
    title: 'Grading Criteria & Reflection', 
    route: '/exercise/grading-criteria-reflection', 
    type: 'two-column', 
    props: { 
      leftColumn: {
        title: 'Grading criteria',
        description: 'Formulate grading criteria for your course.',
        fields: [
          { label: 'gradingCriteria', placeholder: 'Type your answer here max 150 word', required: true }
        ]
      },
      rightColumn: {
        title: 'Reflection',
        description: 'What was challenging, problematic, or otherwise in need of attention within the design, teaching, or assessment of the course you have selected to develop or create? Describe this focus of development by defining what it is exactly that you would like to enhance? Why would you like to develop particularly this aspect of the course? As examples, you may consider targeting assessment practices, teaching methods, or bringing more meaningful variety into the use of educational technologies and online materials within your selected course. In your write-up, you may also reflect on what you would specifically do or create to further develop the course, if you already have initial thoughts on this. You can brainstorm and write about, e.g., a more purposeful grading method, or making the course more activating for students, or developing an online-based or blended course from the basis of a contact-class course.',
        fields: [
          { label: 'reflection', placeholder: 'Type your answer here max 150 word', required: true }
        ]
      }
    } 
  },
  { id: 'targetAudience', title: 'Target Audience', route: '/exercise/target-audience', type: 'text', props: { multiline: true, required: true, placeholder: 'Describe your target learners, their background, and prerequisites...' } },
  { id: 'courseStructure', title: 'Course Structure', route: '/exercise/course-structure', type: 'table', props: { headers: ['Module', 'Topics', 'Duration'], rows: 6 } },
  { id: 'assessmentStrategy', title: 'Assessment Strategy', route: '/exercise/assessment-strategy', type: 'text', props: { multiline: true, placeholder: 'Outline your assessment methods and grading criteria...' } },
  { id: 'resources', title: 'Learning Resources', route: '/exercise/resources', type: 'table', props: { headers: ['Resource Type', 'Description', 'Access'], rows: 8 } },
  { id: 'technology', title: 'Technology Requirements', route: '/exercise/technology', type: 'text', props: { multiline: true, placeholder: 'List required technologies, platforms, and tools...' } },
  { id: 'timeline', title: 'Implementation Timeline', route: '/exercise/timeline', type: 'table', props: { headers: ['Phase', 'Tasks', 'Deadline'], rows: 5 } },
  { id: 'evaluation', title: 'Course Evaluation Plan', route: '/exercise/evaluation', type: 'text', props: { multiline: true, placeholder: 'Describe how you will evaluate the effectiveness of your course...' } },
];


