import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
}

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchCategories();
    
    // If category is provided in URL, pre-select it
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategoryId(categoryFromUrl);
    }
  }, [user, navigate, searchParams]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('forum_categories')
      .select('id, name, description')
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
    setInitialLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !selectedCategoryId) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('forum_posts')
      .insert({
        title: title.trim(),
        content: content.trim(),
        category_id: selectedCategoryId,
        user_id: user!.id
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Post created successfully!"
      });
      navigate('/forum');
    }

    setLoading(false);
  };

  if (initialLoading) {
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
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/forum')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Forum
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Create New Post</h1>
              <p className="text-muted-foreground">Share your experience or ask a question</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>New Forum Post</CardTitle>
            <CardDescription>
              Help others by sharing your immigration experiences or ask questions to get community support.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Write a clear and descriptive title..."
                  maxLength={200}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {title.length}/200 characters
                </p>
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your story, ask questions, or provide advice to help others in their immigration journey..."
                  rows={8}
                  maxLength={5000}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {content.length}/5000 characters
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Post
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/forum')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NewPost;