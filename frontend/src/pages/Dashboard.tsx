import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Bookmark, BookmarkX, FileText, Landmark, LayoutDashboard, ShieldCheck, Sparkles } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { checkEligibility, getEligibilityHistory } from "../services/api";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { useToast } from "../hooks/useToast";

export function Dashboard() {
  const { user, savedSchemes, toggleSaveScheme } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [recommendedSchemes, setRecommendedSchemes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    
    async function loadHistory() {
      try {
        const hist = await getEligibilityHistory();
        setHistory(hist);
      } catch (err) {
        console.error("Failed to load history", err);
      } finally {
        setIsLoading(false);
      }
    }

    async function loadRecommendations() {
      if (!user.profile || !user.profile.occupation || !user.profile.state) {
        setRecommendedSchemes([]);
        return;
      }

      setIsLoadingRecommendations(true);
      try {
        const result = await checkEligibility({
          name: user.full_name || "Anonymous Citizen",
          consent: true,
          age: user.profile.age ?? 18,
          gender: user.profile.gender || "prefer_not_to_say",
          occupation: user.profile.occupation || "",
          income: user.profile.income ?? 0,
          state: user.profile.state || user.state,
          disability_status: user.profile.disability_status ?? false,
          category: user.profile.category || "General",
          student_status: user.profile.student_status ?? false,
          farmer_status: user.profile.farmer_status ?? false,
          employment_status: user.profile.employment_status || "unemployed",
          has_pucca_house: user.profile.has_pucca_house ?? false,
          rural_resident: user.profile.rural_resident ?? false,
          has_bank_account: user.profile.has_bank_account ?? true,
        });
        setRecommendedSchemes(result.eligible_schemes.slice(0, 4));
      } catch (err) {
        console.error("Failed to load recommendations", err);
        setRecommendedSchemes([]);
      } finally {
        setIsLoadingRecommendations(false);
      }
    }

    loadHistory();
    loadRecommendations();
  }, [user, navigate]);

  async function handleRemoveScheme(name: string) {
    try {
      await toggleSaveScheme(name);
      showToast({ title: "Scheme removed", description: `'${name}' was removed from your library.` });
    } catch (e) {
      showToast({ title: "Action failed", description: "Could not unsave scheme.", variant: "error" });
    }
  }

  if (!user) {
    return null;
  }

  // Get last profile checked
  const lastCheck = history.length > 0 ? history[0] : null;
  const lastProfile = lastCheck ? lastCheck.profile : null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8 border mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Citizen Service Portal</p>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">Welcome back, {user.full_name}</h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
            Your citizen profile is active for state of <span className="font-semibold text-foreground">{user.state}</span>. Verify scheme eligibility or update your profile flags below.
          </p>
        </div>
        <div className="flex gap-2">
          {user.is_admin ? (
            <Link to="/admin">
              <Button variant="outline" className="h-11">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                <span>Admin Panel</span>
              </Button>
            </Link>
          ) : null}
          <Link to="/eligibility">
            <Button className="h-11 px-5">
              <span>Start eligibility wizard</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-6 sm:grid-cols-3 mb-8">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Total Recommendations</CardDescription>
            <CardTitle className="text-3xl font-extrabold mt-1">
              {isLoading ? <Skeleton className="h-9 w-12" /> : history.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Eligibility check history logs</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Saved Schemes</CardDescription>
            <CardTitle className="text-3xl font-extrabold mt-1">{savedSchemes.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Personal Scheme Library bookmarks</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Security Protection</CardDescription>
            <CardTitle className="text-3xl font-extrabold mt-1 text-primary flex items-center gap-1.5">
              <ShieldCheck className="h-7 w-7 text-primary shrink-0" />
              <span className="text-xl">AES-256</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Sensitive parameters are encrypted</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left Column: Saved Schemes & History */}
        <div className="space-y-8">
          {/* Saved Schemes Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-primary" />
                <span>Personal Scheme Library</span>
              </CardTitle>
              <CardDescription>
                Schemes you bookmarked for quick access and tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedSchemes.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground text-sm">
                  You have not saved any schemes yet. Browse schemes to save.
                  <div className="mt-4">
                    <Link to="/schemes">
                      <Button variant="outline">Browse Directory</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  {savedSchemes.map((name) => (
                    <div key={name} className="flex items-center justify-between p-3.5 border rounded-xl bg-card hover:bg-muted/10 transition-colors">
                      <div className="min-w-0 pr-4">
                        <p className="font-semibold text-sm truncate">{name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Central/State scheme</p>
                      </div>
                      <Button variant="ghost" className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10" onClick={() => handleRemoveScheme(name)}>
                        <BookmarkX className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommended Schemes */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Recommended Schemes</span>
              </CardTitle>
              <CardDescription>
                Personalized matches derived from your saved profile and deterministic eligibility rules.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingRecommendations ? (
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : recommendedSchemes.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground text-sm">
                  Complete your profile to receive better recommendations.
                </div>
              ) : (
                <div className="space-y-3">
                  {recommendedSchemes.map((decision) => (
                    <div key={decision.scheme.scheme_name} className="rounded-xl border bg-muted/10 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold">{decision.scheme.scheme_name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{decision.scheme.summary}</p>
                        </div>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          {decision.match_percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Profile Summary */}
        <div>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Profile Summary</CardTitle>
              <CardDescription>Your current demographic parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y text-sm">
                <div className="flex justify-between py-2.5">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium text-foreground">{user.full_name}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium text-foreground">{user.email}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-muted-foreground">State of Residence</span>
                  <span className="font-medium text-foreground">{user.state}</span>
                </div>
                {user.profile && Object.values(user.profile).some((value) => value !== null && value !== undefined && value !== "") ? (
                  <>
                    <div className="flex justify-between py-2.5">
                      <span className="text-muted-foreground">Age</span>
                      <span className="font-medium text-foreground">{user.profile.age ?? "—"} yrs</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-muted-foreground">Gender</span>
                      <span className="font-medium text-foreground capitalize">{user.profile.gender ?? "—"}</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-muted-foreground">Occupation</span>
                      <span className="font-medium text-foreground capitalize">{user.profile.occupation ?? "—"}</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-muted-foreground">Annual Income</span>
                      <span className="font-medium text-foreground">{user.profile.income ? `Rs. ${user.profile.income.toLocaleString()}` : "—"}</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium text-foreground">{user.profile.category ?? "—"}</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-muted-foreground">Disability Flag</span>
                      <span className="font-medium text-foreground">{user.profile.disability_status ? "Yes" : "No"}</span>
                    </div>
                  </>
                ) : (
                  <div className="py-4 text-center text-xs text-muted-foreground">
                    Complete your profile to receive better recommendations.
                  </div>
                )}
              </div>
              <div className="mt-6">
                <Link to="/eligibility">
                  <Button variant="outline" className="w-full">
                    Update Profile Data
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
