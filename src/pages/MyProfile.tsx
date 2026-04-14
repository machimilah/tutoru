import { UserButton, useUser, Show } from "@clerk/react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Wallet, BookOpen, Settings, Paintbrush, Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

import { toast } from "sonner";

export default function MyProfile() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isCreatingClass, setIsCreatingClass] = useState(false);
  const [newClass, setNewClass] = useState({ subject: '', university: '', price: '', area: 'Online' });

  const { data: myClasses, isLoading: isLoadingClasses } = useQuery({
    queryKey: ['my-classes', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase.from('classes').select('*').eq('tutor_id', user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const createClassMutation = useMutation({
    mutationFn: async (classData: any) => {
      // 1. Pre-emptively sync the user to Supabase to prevent Foreign Key constraint errors 
      // in case the webhook didn't fire or they are an older user.
      if (user) {
        const { error: userError } = await supabase.from('users').upsert({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          username: user.username || user.fullName || "Tutor"
        }, { onConflict: 'id' });
        
        if (userError) {
          console.error("User sync error:", userError.message);
          // We won't throw immediately here because it might just be an RLS error on users table, 
          // but we still want to attempt the class insertion which might work.
        }
      }

      // 2. Insert the class
      const { data, error } = await supabase.from('classes').insert([classData]).select();
      if (error) {
        console.error("Supabase Error:", error.message);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-classes', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['featured-classes'] });
      queryClient.invalidateQueries({ queryKey: ['all-classes'] });
      setIsCreatingClass(false);
      setNewClass({ subject: '', university: '', price: '', area: 'Online' });
      toast.success("Class published successfully!");
    },
    onError: (err: any) => {
      toast.error(`Error: ${err.message}`);
    }
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
       toast.error("You must be logged in to create a class.");
       return;
    }
    
    createClassMutation.mutate({
      tutor_id: user.id,
      subject: newClass.subject,
      university: newClass.university,
      price: parseInt(newClass.price) || 0,
      area: newClass.area,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-24">
      <Navbar />
      <section className="flex flex-col items-center justify-center px-4 pt-10 pb-8 min-h-[60vh]">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 px-6 py-10 md:px-10 md:py-16 mb-8 backdrop-blur-[2px] bg-background/80 border border-white/20 dark:border-white/10 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.10)] w-full max-w-5xl">
          <Show when="signed-in">
            <Tabs defaultValue="overview" className="flex flex-col md:flex-row w-full gap-8">
              {/* Sidebar Tabs */}
              <div className="w-full md:w-64 flex flex-col gap-6 shrink-0">
                <div className="flex flex-col items-center gap-2 mb-4 p-4 bg-card/50 rounded-2xl border border-border/50">
                  <UserButton appearance={{ elements: { avatarBox: "w-16 h-16" } }}>
                    <UserButton.MenuItems>
                      <UserButton.Link 
                        label="My Profile" 
                        href="/my-profile" 
                        labelIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>} 
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                  <div className="font-semibold text-lg text-center mt-2">{user?.fullName || user?.username || user?.id}</div>
                  <div className="text-muted-foreground text-xs text-center">{user?.primaryEmailAddress?.emailAddress}</div>
                </div>
                
                <TabsList className="flex flex-col h-auto bg-transparent space-y-2 p-0">
                  <TabsTrigger value="overview" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl">
                    <User className="w-4 h-4" /> Overview
                  </TabsTrigger>
                  <TabsTrigger value="wallet" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl">
                    <Wallet className="w-4 h-4" /> Wallet
                  </TabsTrigger>
                  <TabsTrigger value="classes" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl">
                    <BookOpen className="w-4 h-4" /> My Classes
                  </TabsTrigger>
                  <TabsTrigger value="customize" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl">
                    <Paintbrush className="w-4 h-4" /> Customize
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl">
                    <Settings className="w-4 h-4" /> Settings
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 min-h-[400px]">
                <TabsContent value="overview" className="mt-0 h-full animate-fade-up">
                  <div className="bg-card/80 p-6 md:p-8 rounded-2xl shadow-sm border border-border w-full flex flex-col gap-6">
                    <h2 className="text-2xl font-display font-bold mb-2">Profile Overview</h2>
                    <div className="flex flex-col md:flex-row md:gap-8 gap-4">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-muted-foreground mb-1">User ID</div>
                        <div className="font-mono text-sm break-all">{user?.id}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-muted-foreground mb-1">Username</div>
                        <div>{user?.username || <span className="italic text-muted-foreground">(none)</span>}</div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-8 gap-4">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-muted-foreground mb-1">Email</div>
                        <div>{user?.primaryEmailAddress?.emailAddress || <span className="italic text-muted-foreground">(none)</span>}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-muted-foreground mb-1">Joined</div>
                        <div>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : <span className="italic text-muted-foreground">(unknown)</span>}</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="wallet" className="mt-0 h-full animate-fade-up">
                  <div className="bg-card/80 p-6 md:p-8 rounded-2xl shadow-sm border border-border w-full flex flex-col gap-6">
                    <h2 className="text-2xl font-display font-bold mb-2">Wallet & Billing</h2>
                    <div className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20 flex flex-col items-center justify-center py-10">
                      <div className="text-sm font-medium text-muted-foreground mb-2">Available Balance</div>
                      <div className="text-4xl font-bold font-display">$0.00</div>
                      <Button variant="hero" className="mt-6">Add Funds</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="classes" className="mt-0 h-full animate-fade-up">
                  <div className="bg-card/80 p-6 md:p-8 rounded-2xl shadow-sm border border-border w-full flex flex-col gap-6">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-2xl font-display font-bold">My Classes</h2>
                      {!isCreatingClass && (
                        <Button onClick={() => setIsCreatingClass(true)} size="sm" className="gap-2">
                          <Plus className="w-4 h-4" /> Create Class
                        </Button>
                      )}
                    </div>
                    
                    {isCreatingClass ? (
                      <form onSubmit={handleCreateSubmit} className="bg-background/50 border border-border p-6 rounded-xl animate-fade-up">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-lg">Create a New Class</h3>
                          <Button variant="ghost" size="icon" type="button" onClick={() => setIsCreatingClass(false)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 mb-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Subject Name</label>
                            <input required value={newClass.subject} onChange={e => setNewClass({...newClass, subject: e.target.value})} placeholder="e.g. Calculus I" className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-muted-foreground">University</label>
                            <input required value={newClass.university} onChange={e => setNewClass({...newClass, university: e.target.value})} placeholder="e.g. MIT" className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Price per hour ($)</label>
                            <input required type="number" min="0" value={newClass.price} onChange={e => setNewClass({...newClass, price: e.target.value})} placeholder="25" className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Area/Location</label>
                            <input required value={newClass.area} onChange={e => setNewClass({...newClass, area: e.target.value})} placeholder="Online" className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm" />
                          </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={createClassMutation.isPending}>
                          {createClassMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Publish Class"}
                        </Button>
                      </form>
                    ) : isLoadingClasses ? (
                      <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin opacity-50" /></div>
                    ) : myClasses && myClasses.length > 0 ? (
                      <div className="grid gap-4">
                        {myClasses.map((c: any) => (
                          <div key={c.id} className="p-4 border border-border rounded-xl flex justify-between items-center bg-background/50">
                            <div>
                              <div className="font-semibold text-foreground">{c.subject}</div>
                              <div className="text-sm text-muted-foreground">{c.university} • {c.area}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-foreground">${c.price}/hr</div>
                              <div className="text-xs text-muted-foreground">{c.rating || 0}★</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                        <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>You haven't uploaded any classes yet.</p>
                        <Button variant="outline" className="mt-4" onClick={() => setIsCreatingClass(true)}>Upload your first class</Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="customize" className="mt-0 h-full animate-fade-up">
                  <div className="bg-card/80 p-6 md:p-8 rounded-2xl shadow-sm border border-border w-full flex flex-col gap-6">
                    <h2 className="text-2xl font-display font-bold mb-2">Customize Profile</h2>
                    <p className="text-muted-foreground text-sm">Personalize how others see you on TutorU.</p>
                    <div className="space-y-4 mt-2">
                       <div className="p-4 border border-border rounded-xl flex justify-between items-center bg-background/50">
                          <div>
                            <div className="font-medium">Public Profile</div>
                            <div className="text-xs text-muted-foreground">Allow others to view your university info and stats.</div>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                       </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-0 h-full animate-fade-up">
                  <div className="bg-card/80 p-6 md:p-8 rounded-2xl shadow-sm border border-border w-full flex flex-col gap-6">
                    <h2 className="text-2xl font-display font-bold mb-2">Account Settings</h2>
                     <div className="space-y-4">
                       <div className="p-4 border border-border rounded-xl flex justify-between items-center bg-background/50">
                          <div>
                            <div className="font-medium text-destructive">Danger Zone</div>
                            <div className="text-xs text-muted-foreground">Permanently delete your account and all data.</div>
                          </div>
                          <Button variant="destructive" size="sm">Delete Account</Button>
                       </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </Show>
          <Show when="signed-out">
            <div className="text-center py-12 w-full">
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">You are not signed in</h1>
              <p className="mb-4 text-muted-foreground">Log in to view your profile and manage your account.</p>
              <Button variant="hero" asChild><a href="/">Go Home</a></Button>
            </div>
          </Show>
        </div>
      </section>
      <footer className="border-t border-border py-6 md:py-8 px-4 md:px-6 text-center text-xs md:text-sm text-muted-foreground">
        © 2026 TutorU. Built by students, for students.
      </footer>
    </div>
  );
}
