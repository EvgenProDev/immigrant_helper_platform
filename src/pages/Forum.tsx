import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MessageCircle, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  profile?: {
    display_name: string;
  };
  comments_count: number;
}

const Forum = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchCategories();
  }, [user, navigate]);

  useEffect(() => {
    if (selectedCategory) {
      fetchPosts();
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('forum_categories')
      .select('*')
      .order('name');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive"
      });
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  };

  const fetchPosts = async () => {
    if (!selectedCategory) return;

    // First get posts
    const { data: postsData, error: postsError } = await supabase
      .from('forum_posts')
      .select('*')
      .eq('category_id', selectedCategory.id)
      .order('created_at', { ascending: false });

    if (postsError) {
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive"
      });
      return;
    }

    if (!postsData || postsData.length === 0) {
      setPosts([]);
      return;
    }

    // Get unique user IDs
    const userIds = [...new Set(postsData.map(post => post.user_id))];
    
    // Fetch profiles for these users
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('user_id, display_name')
      .in('user_id', userIds);

    // Get comment counts for each post
    const { data: commentsData } = await supabase
      .from('forum_comments')
      .select('post_id')
      .in('post_id', postsData.map(post => post.id));

    // Create a map of profiles and comment counts
    const profilesMap = new Map(
      profilesData?.map(profile => [profile.user_id, profile]) || []
    );
    
    const commentCounts = commentsData?.reduce((acc, comment) => {
      acc[comment.post_id] = (acc[comment.post_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    // Combine the data
    const enrichedPosts = postsData.map(post => ({
      ...post,
      profile: profilesMap.get(post.user_id),
      comments_count: commentCounts[post.id] || 0
    }));

    setPosts(enrichedPosts);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Immigration Forum</h1>
              <p className="text-muted-foreground">Share experiences and get help from the community</p>
            </div>
            <Button onClick={() => navigate('/')} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!selectedCategory ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">Forum Categories</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Card 
                  key={category.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedCategory(category)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: category.color }}
                      >
                        <span className="text-white text-lg">
                          {category.icon === 'Zap' && '⚡'}
                          {category.icon === 'Heart' && '💝'}
                          {category.icon === 'GraduationCap' && '🎓'}
                          {category.icon === 'Briefcase' && '💼'}
                          {category.icon === 'Flag' && '🇨🇦'}
                          {category.icon === 'MessageCircle' && '💬'}
                        </span>
                      </div>
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory(null)}
                >
                  ← Back to Categories
                </Button>
                <h2 className="text-2xl font-bold">{selectedCategory.name}</h2>
              </div>
              <Button onClick={() => navigate(`/forum/new-post?category=${selectedCategory.id}`)}>
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>

            <div className="space-y-4">
              {posts.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Be the first to start a discussion in this category!
                    </p>
                    <Button onClick={() => navigate(`/forum/new-post?category=${selectedCategory.id}`)}>
                      Create First Post
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                posts.map((post) => (
                  <Card 
                    key={post.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/forum/post/${post.id}`)}
                  >
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.profile?.display_name || 'Anonymous'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDate(post.created_at)}
                        </div>
                        <Badge variant="outline">
                          {post.comments_count} comments
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {post.content}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Forum;