'use client';

import Link from 'next/link';

/**
 * ForumCard Component
 * 
 * Displays a forum topic card with title, description, category, and latest post information.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the forum topic
 * @param {string} props.description - A brief description of the topic
 * @param {Object} props.category - Category information
 * @param {string} props.category.name - Name of the category
 * @param {string} props.category.slug - URL-friendly identifier for the category
 * @param {number} props.postsCount - Number of posts in the topic
 * @param {Object} props.latestPost - Latest post information
 * @param {Object} props.latestPost.author - Author information
 * @param {string} props.latestPost.author.username - Username of the author
 * @param {string} props.latestPost.timeAgo - Relative time display (e.g., "2 hours ago")
 * @param {string} props.latestPost.excerpt - Brief excerpt from the post
 * @param {string} props.slug - URL-friendly identifier for the topic
 * 
 * Backend Integration Notes:
 * - This component expects the backend to provide data in this exact structure
 * - For date handling:
 *   - Option 1: Backend provides formatted relative time strings (e.g., "2 hours ago")
 *   - Option 2: Backend provides ISO timestamps and frontend formats them
 *     (if so, modify this component to use a date formatting library)
 * - For excerpts:
 *   - Option 1: Backend provides pre-truncated excerpts
 *   - Option 2: Frontend truncates with CSS (current implementation)
 */
const Card = ({
    title,
    description,
    category,
    postsCount = 0, // Default value
    latestPost = null, // Make this optional
    slug
}) => {
    // Format slug if not provided (fallback for incomplete data)
    const topicSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    return (
        <div className="card bg-secondary hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-3">
                {category && (
                    <Link
                        href={`/category/${category.slug}`}
                        className="px-3 py-1 bg-primary/20 rounded-full text-primary text-xs font-medium"
                    >
                        {category.name}
                    </Link>
                )}
                <div className="text-xs text-gray-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    {postsCount} posts
                </div>
            </div>

            <Link href={`/topic/${topicSlug}`}>
                <h3 className="text-lg font-semibold text-white hover:text-primary transition-colors mb-2">{title}</h3>
            </Link>

            <p className="text-gray-300 text-sm mb-4">{description}</p>

            {latestPost && (
                <div className="border-t border-primary/10 pt-4 mt-2">
                    <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                            {latestPost.author?.username?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div>
                            <div className="flex items-center">
                                <p className="text-xs font-medium text-primary">{latestPost.author?.username || 'Anonymous'}</p>
                                <span className="mx-2 text-gray-500">•</span>
                                <p className="text-xs text-gray-400">{latestPost.timeAgo || 'Recently'}</p>
                            </div>
                            <p className="text-xs text-gray-300 mt-1 line-clamp-1">{latestPost.excerpt || 'No preview available'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;