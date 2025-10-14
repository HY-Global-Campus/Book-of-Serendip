
export interface ChooseChallenge {
	left: {
		title: string;
		description: string;
		answer: string;
	};

	right: {
		title: string;
		description: string;
		answer: string;
	}
}

export interface ChooseChallengeAnswer {
	left: {
		answer: string;
	};

	right: {
		answer: string;
	}
}

export interface IdentifyLeveragePoints {
	left: {
		title: string;
		description: string;
		question1: {
			title: string;
			answer: string;
		};
		question2: {
			title: string;
			answer: string;
		};
		question3: {
			title: string;
			answer: string;
		};
	};

	right: {
		title: string;
		description: string;
		answer: string;
	}
}

export interface IdentifyLeveragePointsAnswer {
	left: {
		question1: {
			answer: string;
		};
		question2: {
			answer: string;
		};
		question3: {
			answer: string;
		};
	};

	right: {
		answer: string;
	}
}

export interface RedefineChallenge {
	left: {
		title: string;
		description: string;
		answer: string;
	};
	right: {
		title: string;
		description: string;
		answer: string;
	};
}

export interface RedefineChallengeAnswer {
	left: {
		answer: string;
	};
	right: {
		answer: string;
	};
}

export interface Values {
	left: {
		title: string;
		description: string;
		question1: {
			title: string;
			answer: string;
		};
		question2: {
			title: string;
			answer: string;
		};
		question3: {
			title: string;
			answer: string;
		};
	};

	right: null;
}

export interface ValuesAnswer {
	left: {
		question1: {
			answer: string;
		};
		question2: {
			answer: string;
		};
		question3: {
			answer: string;
		};
	};

	right: null;
}

export interface FromFutureToPresent {
	left: {
		title: string;
		question: string;
		answer: string;
	};

	right: {
		title: string;
		desciption: string;
		question1: {
			title: string;
			answer: string;
		};
		question2: {
			title: string;
			answer: string;
		};
		question3: {
			title: string;
			answer: string;
		};
		question4: {
			title: string;
			answer: string;
		};
		question5: {
			title: string;
			answer: string;
		};
		question6: {
			title: string;
			answer: string;
		}
	};
}

export interface FromFutureToPresentAnswer {
	left: {
		answer: string;
	};

	right: {
		question1: {
			answer: string;
		};
		question2: {
			answer: string;
		};
		question3: {
			answer: string;
		};
		question4: {
			answer: string;
		};
		question5: {
			answer: string;
		};
		question6: {
			answer: string;
		}
	};
}

export interface FuturePitch {
	left: {
		title: string;
		answer: string;
	}
}

export interface FuturePitchAnswer {
	left: {
		answer: string;
	}
}

export interface BookOneExercises {}

export type CourseExercises = BookOneExercises & {
  courseInfo?: {
    Name?: string;
    Scope?: string;
    'Target students'?: string;
    'Students\' skill level'?: string;
  };
  learningObjectives?: {
    value: string[][];
  };
  coreContent?: {
    'Core content'?: string;
    ''?: string; // Right column field without label
  };
  teachingMethods?: {
    value: string[][];
  };
  assessmentMethods?: {
    value: string[][];
  };
  gradingCriteriaReflection?: {
    'Grading criteria'?: string;
    'Reflection'?: string;
  };
  targetAudience?: {
    value: string;
  };
  courseStructure?: {
    value: string[][];
  };
  assessmentStrategy?: {
    value: string;
  };
  resources?: {
    value: string[][];
  };
  technology?: {
    value: string;
  };
  timeline?: {
    value: string[][];
  };
  evaluation?: {
    value: string;
  };
};
