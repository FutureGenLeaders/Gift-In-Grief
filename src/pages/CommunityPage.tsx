
import React, { useState } from "react";
import HomeNav from "@/components/home/HomeNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, Heart, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const communityPosts = [
  {
    id: 1,
    author: "Sarah Chen",
    content: "Just completed my 30-day streak! The nervous system work is really paying off in my leadership style. Feeling more grounded and present in difficult conversations.",
    timestamp: "2 hours ago",
    likes: 12,
    replies: 3
  },
  {
    id: 2,
    author: "Michael Rodriguez",
    content: "Question for the group: How do you handle regulation when dealing with difficult team members? Looking for practical strategies beyond the breathing techniques.",
    timestamp: "4 hours ago",
    likes: 8,
    replies: 7
  },
  {
    id: 3,
    author: "Dr. Amanda Foster",
    content: "Sharing a breakthrough moment: Used the emergency protocol during a board meeting crisis yesterday. Game changer. Thank you to this community for the support!",
    timestamp: "1 day ago",
    likes: 24,
    replies: 9
  }
];

export default function CommunityPage() {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState("");

  return (
    <div className="min-h-screen bg-black">
      <HomeNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Users className="h-8 w-8 text-yellow-600 mr-3" />
              Sacred Circle Community
            </h1>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10"
            >
              Back to Dashboard
            </Button>
          </div>

          <p className="text-gray-300 mb-8">
            Connect with fellow leaders on their transformation journey. Share insights, ask questions, and support each other's growth.
          </p>

          {/* Create New Post */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Share with the Community</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Share your insights, ask questions, or celebrate your wins..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="bg-black/40 border-slate-600 text-white mb-4"
                rows={4}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  Be respectful and supportive. This is a safe space for growth.
                </span>
                <Button 
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  disabled={!newPost.trim()}
                >
                  Share Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-700/30 mb-8">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-200 mb-2">Community Guidelines</h3>
              <ul className="text-sm text-blue-300 space-y-1">
                <li>• Maintain confidentiality and respect privacy</li>
                <li>• Offer support and constructive feedback</li>
                <li>• Share insights and experiences authentically</li>
                <li>• Keep discussions focused on growth and development</li>
              </ul>
            </CardContent>
          </Card>

          {/* Community Posts */}
          <div className="space-y-6">
            {communityPosts.map((post) => (
              <Card key={post.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-red-700 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{post.author}</h4>
                      <p className="text-sm text-gray-400">{post.timestamp}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-200 mb-4">{post.content}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <button className="flex items-center hover:text-red-400 transition-colors">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </button>
                    <button className="flex items-center hover:text-blue-400 transition-colors">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.replies} replies
                    </button>
                    <button className="flex items-center hover:text-green-400 transition-colors">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
