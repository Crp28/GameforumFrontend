'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Link from 'next/link';

const forumTopics = [
  {
    id: 1,
    title: 'Elden Ring - Strategies for Defeating Malenia',
    description: 'Share your strategies, builds, and tips for taking down one of the hardest bosses in Elden Ring.',
    slug: 'elden-ring-malenia-strategies',
    category: { name: 'Action RPG', slug: 'action-rpg' },
    postsCount: 126,
    latestPost: {
      author: { username: 'tarnished42' },
      timeAgo: '2 hours ago', // Backend should provide timestamp, frontend formats to relative time
      excerpt: 'I found that using the Mimic Tear ash summon along with a bleed build makes this fight much more manageable...'
    }
  },
  {
    id: 2,
    title: 'Best Settings for Competitive Apex Legends',
    description: 'Optimize your gameplay with these recommended settings for competitive play in Apex Legends.',
    slug: 'apex-legends-competitive-settings',
    category: { name: 'FPS', slug: 'fps' },
    postsCount: 87,
    latestPost: {
      author: { username: 'wraith_main' },
      timeAgo: '5 hours ago',
      excerpt: 'Turning down particle effects can significantly improve visibility during intense firefights...'
    }
  },
  {
    id: 3,
    title: 'Starfield - Hidden Locations and Easter Eggs',
    description: 'Discover the secrets of the cosmos with this collection of hidden locations and easter eggs in Starfield.',
    slug: 'starfield-secrets',
    category: { name: 'Open World', slug: 'open-world' },
    postsCount: 54,
    latestPost: {
      author: { username: 'cosmic_explorer' },
      timeAgo: '1 day ago',
      excerpt: 'Found a reference to Skyrim on one of the planets in the Narion system...'
    }
  },
  {
    id: 4,
    title: 'The Most Efficient Farm Routes in Diablo IV',
    description: 'Maximize your legendary drops and XP gains with these optimized farming routes.',
    slug: 'diablo-4-farm-routes',
    category: { name: 'ARPG', slug: 'arpg' },
    postsCount: 112,
    latestPost: {
      author: { username: 'lilith_servant' },
      timeAgo: '3 hours ago',
      excerpt: 'The Dry Steppes route consistently gives me about 4-5 legendaries per hour...'
    }
  },
  {
    id: 5,
    title: 'Baldur\'s Gate 3 - Best Party Compositions',
    description: 'Discuss the most effective party compositions for different playstyles in Baldur\'s Gate 3.',
    slug: 'bg3-party-compositions',
    category: { name: 'CRPG', slug: 'crpg' },
    postsCount: 98,
    latestPost: {
      author: { username: 'laezel_fan' },
      timeAgo: '12 hours ago',
      excerpt: 'I find that having at least one character with high charisma is essential for most dialogue options...'
    }
  },
  {
    id: 6,
    title: 'Upcoming Game Releases - Summer 2025',
    description: 'Stay updated on all the major game releases coming this summer.',
    slug: 'summer-2025-releases',
    category: { name: 'News', slug: 'news' },
    postsCount: 31,
    latestPost: {
      author: { username: 'game_journalist' },
      timeAgo: '1 day ago',
      excerpt: 'Just heard that the new Mass Effect title might be getting pushed back to fall...'
    }
  }
];

/**
 * TRENDING TAGS - PLACEHOLDER DATA
 * 
 * This data will be replaced with API calls to the backend.
 * 
 * Expected API Endpoint: /api/tags/trending
 * Method: GET
 * Query Parameters:
 *   - limit: number (number of tags to return)
 *   - timeframe: string (e.g., 'day', 'week', 'month')
 * 
 * Data structure should match:
 * - name: string (tag name)
 * - count: number (usage count or post count)
 * - slug: string (optional, URL-friendly version of name - could be generated frontend)
 * 
 * For implementation:
 * 1. Use Next.js data fetching or useEffect hook
 * 2. Consider caching this data as it may not change frequently
 * 3. Add error fallback to show generic tags if API fails
 */
const trendingTags = [
  { name: 'Elden Ring', count: 532 },
  { name: 'Baldur\'s Gate 3', count: 417 },
  { name: 'Starfield', count: 389 },
  { name: 'PS6', count: 275 },
  { name: 'Game Awards', count: 201 },
  { name: 'Diablo IV', count: 184 },
  { name: 'Xbox', count: 156 },
  { name: 'Nintendo', count: 143 }
];

/**
 * POPULAR CATEGORIES - PLACEHOLDER DATA
 * 
 * This data will be replaced with API calls to the backend.
 * 
 * Expected API Endpoint: /api/categories
 * Method: GET
 * Query Parameters:
 *   - sort: string (e.g., 'popular', 'alphabetical')
 *   - limit: number (number of categories to return)
 * 
 * Data structure should match:
 * - name: string (category name)
 * - slug: string (URL-friendly identifier)
 * - topics: number (count of topics in category)
 * - icon: string (optional, for category icon - could be name/identifier of icon)
 * 
 * For implementation:
 * 1. This data changes infrequently, so consider:
 *    - Static generation with ISR (Incremental Static Regeneration)
 *    - Client-side caching strategies
 * 2. Add error handling for API failures
 */
const popularCategories = [
  { name: 'Action RPG', slug: 'action-rpg', topics: 143 },
  { name: 'FPS', slug: 'fps', topics: 128 },
  { name: 'Strategy', slug: 'strategy', topics: 97 },
  { name: 'MMORPG', slug: 'mmorpg', topics: 85 },
  { name: 'Indie Games', slug: 'indie', topics: 76 },
  { name: 'Gaming News', slug: 'news', topics: 62 }
];

export default function Home() {
  // State for storing data from API
  const [topics, setTopics] = useState(forumTopics);
  const [tags, setTags] = useState(trendingTags);
  const [categories, setCategories] = useState(popularCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest' or 'popular'

  /**
   * BACKEND INTEGRATION
   * 
   * When connecting to the backend, uncomment and implement these functions:
   */

  // Example function for fetching topics from the backend
  /*
  const fetchTopics = async (sort = 'latest') => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch data from API
      const response = await fetch(`/api/topics?sort=${sort}&limit=6`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch topics');
      }
      
      const data = await response.json();
      setTopics(data);
    } catch (err) {
      console.error('Error fetching topics:', err);
      setError('Failed to load topics. Please try again later.');
      // Keep using the placeholder data as a fallback
    } finally {
      setIsLoading(false);
    }
  };
  */

  // Example function for fetching trending tags
  /*
  const fetchTrendingTags = async () => {
    try {
      const response = await fetch('/api/tags/trending?limit=8');
      
      if (response.ok) {
        const data = await response.json();
        setTags(data);
      }
    } catch (err) {
      console.error('Error fetching trending tags:', err);
      // Silently fail and use placeholder data
    }
  };
  */

  // Example function for fetching categories
  /*
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories?sort=popular&limit=6');
      
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Silently fail and use placeholder data
    }
  };
  */

  // Handle sort change
  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    // When connected to backend, call fetchTopics with the new sort order
    // fetchTopics(newSortOrder);
  };

  // Uncomment to fetch data when component mounts
  /*
  useEffect(() => {
    fetchTopics(sortOrder);
    fetchTrendingTags();
    fetchCategories();
    
    // Optional: Set up periodic refreshing for real-time updates
    // const refreshInterval = setInterval(() => {
    //   fetchTopics(sortOrder);
    // }, 60000); // Refresh every minute
    
    // return () => clearInterval(refreshInterval);
  }, []);
  */
  return (
    <>
      {/* Hero Section */}
      <section className="bg-background py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join the Ultimate Gaming Community</h1>
            <p className="text-gray-300 text-lg mb-8">Connect with gamers worldwide, share strategies, discuss your favorite titles, and stay updated with the latest gaming news.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-primary text-lg py-3 px-8">Join Now</button>
              <button className="btn-secondary text-lg py-3 px-8">Browse Forums</button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Forum Topics - 2/3 width on desktop */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {isLoading ? 'Loading...' : sortOrder === 'latest' ? 'Latest Discussions' : 'Popular Discussions'}
                </h2>
                <div className="flex space-x-2">
                  <button
                    className={`text-sm py-1 px-3 ${sortOrder === 'latest' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleSortChange('latest')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    Latest
                  </button>
                  <button
                    className={`text-sm py-1 px-3 ${sortOrder === 'popular' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleSortChange('popular')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Popular
                  </button>
                </div>
              </div>

              {/* Error message display */}
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-md mb-6">
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}

              {/* Loading skeleton (shows when isLoading is true) */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="card animate-pulse">
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-6 bg-primary/20 rounded-full w-24"></div>
                        <div className="h-4 bg-primary/20 rounded-full w-16"></div>
                      </div>
                      <div className="h-6 bg-primary/20 rounded-md w-3/4 mb-2"></div>
                      <div className="h-4 bg-primary/20 rounded-md w-full mb-4"></div>
                      <div className="border-t border-primary/10 pt-4 mt-2">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-primary/20 rounded-md w-1/4 mb-2"></div>
                            <div className="h-3 bg-primary/20 rounded-md w-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topics.map((topic) => (
                    <Card
                      key={topic.id}
                      title={topic.title}
                      description={topic.description}
                      category={topic.category}
                      postsCount={topic.postsCount}
                      latestPost={topic.latestPost}
                      slug={topic.slug}
                    />
                  ))}
                </div>
              )}

              <div className="mt-8 text-center">
                <button
                  className="btn-secondary"
                  onClick={() => {
                    // When connected to backend, implement pagination:
                    // setPage(prevPage => prevPage + 1);
                    // fetchMoreTopics(sortOrder, page + 1);
                    alert('This will load more topics from the API when connected to the backend.');
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Load More Topics'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sidebar - 1/3 width on desktop */}
            <div className="lg:col-span-1 space-y-8">
              {/* Welcome for new users */}
              <div className="card bg-primary/10 border-primary">
                <h3 className="text-lg font-semibold text-white mb-3">Welcome to GameForum!</h3>
                <p className="text-gray-300 text-sm mb-4">Join our community to participate in discussions, create your own topics, and connect with fellow gamers.</p>
                <button className="btn-primary w-full">Sign Up Now</button>
              </div>

              {/* Trending Tags */}
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/tag/${tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 py-1 bg-background rounded-full text-xs text-gray-300 hover:bg-primary hover:text-white transition-colors duration-200"
                    >
                      {tag.name} <span className="text-gray-400">({tag.count})</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Categories */}
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">Popular Categories</h3>
                <ul className="space-y-3">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        href={`/category/${category.slug}`}
                        className="flex items-center justify-between group"
                      >
                        <span className="text-gray-300 group-hover:text-primary transition-colors">{category.name}</span>
                        <span className="bg-background px-2 py-1 rounded-md text-xs text-gray-400">{category.topics} topics</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Online Users */}
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">Online Now</h3>
                <div className="flex flex-wrap gap-2">
                  {[...Array(8)].map((_, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                      title={`User ${index + 1}`}
                    >
                      <span className="text-xs font-bold text-primary">{String.fromCharCode(65 + index)}</span>
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">+42</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-400">51 members online now</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-primary/10">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to join the conversation?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Create an account to start posting, follow your favorite topics, and connect with other gamers worldwide.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary text-lg py-3 px-8">Join GameForum</button>
            <button className="btn-secondary text-lg py-3 px-8">Learn More</button>
          </div>
        </div>
      </section>
    </>
  );
}