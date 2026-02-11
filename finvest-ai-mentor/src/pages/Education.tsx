import React, { useState } from 'react';
import { 
  GraduationCap, 
  Play,
  Clock,
  Star,
  BookOpen,
  Award,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  Lock
} from 'lucide-react';
import { mockEducationalContent } from '../data/mockData';
import { EducationCategory, DifficultyLevel } from '../types';

export const Education: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<EducationCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');

  const categories = [
    { id: 'all', name: 'Tutti i Corsi', icon: BookOpen },
    { id: 'basics', name: 'Fondamentali', icon: GraduationCap },
    { id: 'stocks', name: 'Azioni', icon: TrendingUp },
    { id: 'analysis', name: 'Analisi', icon: Target },
    { id: 'psychology', name: 'Psicologia', icon: Users },
  ];

  const difficulties = [
    { id: 'all', name: 'Tutti i Livelli' },
    { id: 'beginner', name: 'Principiante' },
    { id: 'intermediate', name: 'Intermedio' },
    { id: 'advanced', name: 'Avanzato' },
  ];

  const filteredContent = mockEducationalContent.filter(content => {
    const categoryMatch = selectedCategory === 'all' || content.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || content.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case DifficultyLevel.BEGINNER: return 'bg-green-100 text-green-800';
      case DifficultyLevel.INTERMEDIATE: return 'bg-yellow-100 text-yellow-800';
      case DifficultyLevel.ADVANCED: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLearningPath = () => [
    {
      id: 1,
      title: 'Fondamenti dell\'Investimento',
      description: 'Inizia dalle basi degli investimenti',
      courses: 3,
      duration: 180,
      completed: true,
      color: 'bg-green-500'
    },
    {
      id: 2,
      title: 'Analisi Fondamentale',
      description: 'Impara ad analizzare le aziende',
      courses: 4,
      duration: 240,
      completed: false,
      current: true,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Analisi Tecnica',
      description: 'Studia grafici e indicatori',
      courses: 5,
      duration: 300,
      completed: false,
      locked: true,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Portfolio Management',
      description: 'Gestisci il tuo portfolio',
      courses: 3,
      duration: 200,
      completed: false,
      locked: true,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <GraduationCap className="mr-3 h-8 w-8 text-primary-600" />
            Education Hub
          </h1>
          <p className="mt-2 text-gray-600">
            Migliora le tue competenze di investimento con corsi personalizzati
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Corsi Completati</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Ore di Studio</p>
              <p className="text-2xl font-bold text-primary-600">45</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="glass rounded-xl p-6 bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Livello Attuale</p>
              <p className="text-lg font-semibold text-gray-900">Intermedio</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Prossimo Obiettivo</p>
              <p className="text-lg font-semibold text-gray-900">Analisi Tecnica</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Punti XP</p>
              <p className="text-lg font-semibold text-gray-900">2,450</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Completamento</p>
              <p className="text-lg font-semibold text-gray-900">68%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Percorsi di Apprendimento
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getLearningPath().map((path, index) => (
            <div key={path.id} className={`relative p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
              path.completed ? 'bg-green-50 border-green-200' :
              path.current ? 'bg-blue-50 border-blue-200' :
              path.locked ? 'bg-gray-50 border-gray-200 opacity-60' :
              'bg-white border-gray-200'
            }`}>
              {path.locked && (
                <div className="absolute top-4 right-4">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
              )}
              {path.completed && (
                <div className="absolute top-4 right-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-full ${path.color} flex items-center justify-center mb-4`}>
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-2">{path.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{path.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Corsi:</span>
                  <span className="font-medium">{path.courses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Durata:</span>
                  <span className="font-medium">{Math.round(path.duration / 60)}h</span>
                </div>
              </div>
              
              {path.current && (
                <div className="mt-4">
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">40% completato</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Categoria:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as EducationCategory | 'all')}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Difficoltà:</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel | 'all')}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            {difficulties.map(diff => (
              <option key={diff.id} value={diff.id}>{diff.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((course) => (
          <div key={course.id} className="glass rounded-xl p-6 card-hover">
            {/* Course Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {course.description}
                </p>
              </div>
              {course.videoUrl && (
                <div className="ml-2">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Course Meta */}
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 text-xs rounded-full font-medium ${getDifficultyColor(course.difficulty)}`}>
                {course.difficulty}
              </span>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration} min
              </div>
            </div>

            {/* Progress Bar */}
            {course.progress !== undefined && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progresso</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {course.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {course.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                ) : course.progress && course.progress > 0 ? (
                  <Play className="h-5 w-5 text-primary-600 mr-2" />
                ) : (
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {course.completed ? 'Completato' : 
                   course.progress && course.progress > 0 ? 'Continua' : 'Inizia'}
                </span>
              </div>
              
              <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                course.completed 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}>
                {course.completed ? 'Rivedi' : course.progress && course.progress > 0 ? 'Continua' : 'Inizia'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Course */}
      <div className="glass rounded-xl p-8 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Corso in Evidenza
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Master Class: Portfolio Ottimizzazione con AI
            </h3>
            <p className="text-gray-600 mb-4">
              Impara come utilizzare l'intelligenza artificiale per ottimizzare il tuo portfolio
              di investimenti con tecniche avanzate di machine learning.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                3 ore
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                1,245 studenti
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                4.9 (328 reviews)
              </div>
            </div>
          </div>
          <div className="ml-8">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Accedi Ora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};