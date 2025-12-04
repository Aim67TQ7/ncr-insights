import { useState } from 'react';
import { ArrowRight, BarChart3, Zap, Shield, Smartphone, Monitor, TrendingUp, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic
    console.log('Signup with:', email);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">ReworkIQ</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium">Predictive Quality Intelligence</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Know your problems{' '}
                <span className="text-primary">before</span> they hit the floor
              </h1>
              
              {/* Subheadline */}
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Quality and operations managers lose millions to rework every year. 
                Our AI-powered platform captures data fast and delivers predictive insights 
                that stop defects before they start.
              </p>
              
              {/* CTA Form */}
              <form onSubmit={handleGetStarted} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 px-4 bg-card border-border"
                />
                <Button type="submit" size="lg" className="h-12 px-6 gap-2 whitespace-nowrap">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Setup in minutes</span>
                </div>
              </div>
            </div>
            
            {/* Hero Visual */}
            <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="relative bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border p-6 shadow-2xl">
                {/* Mock dashboard preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <div className="w-3 h-3 rounded-full bg-warning" />
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                    <div className="text-xs text-muted-foreground">Live Dashboard</div>
                  </div>
                  
                  {/* Predictive alert */}
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                      <div>
                        <div className="font-semibold text-destructive">Rework Risk Detected</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Assembly Line 3 shows 87% probability of tolerance issues
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-background/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-primary">42%</div>
                      <div className="text-xs text-muted-foreground">Rework Reduced</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-foreground">$1.2M</div>
                      <div className="text-xs text-muted-foreground">Saved Annually</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-foreground">3.2x</div>
                      <div className="text-xs text-muted-foreground">ROI First Year</div>
                    </div>
                  </div>
                  
                  {/* Chart placeholder */}
                  <div className="h-32 bg-background/30 rounded-lg flex items-end justify-around px-4 pb-4 gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 95, 85].map((h, i) => (
                      <div 
                        key={i} 
                        className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-3 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Prediction Accuracy: 94%</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg p-3 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium">2.3 hrs avg saved/day</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tired of fighting fires on the floor?
            </h2>
            <p className="text-lg text-muted-foreground">
              Quality and operations managers face the same challenges every day. 
              We built ReworkIQ to solve them.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: AlertTriangle,
                title: "Reactive, Not Proactive",
                description: "By the time you spot a defect, it's already cost you time, materials, and customer trust."
              },
              {
                icon: Clock,
                title: "Data Trapped in Silos",
                description: "Quality data lives in spreadsheets, tribal knowledge, and disconnected systems that don't talk."
              },
              {
                icon: BarChart3,
                title: "No Predictive Visibility",
                description: "You can see what happened, but not what's about to happen. Traditional tools can't predict trends."
              }
            ].map((pain, i) => (
              <div key={i} className="bg-background rounded-xl border border-border p-6 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                  <pain.icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{pain.title}</h3>
                <p className="text-muted-foreground">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-6">
              <span className="text-primary font-medium">Platform Features</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              One platform. Complete visibility.
            </h2>
            <p className="text-lg text-muted-foreground">
              Capture data from anywhere, get insights everywhere. Desktop or mobile, 
              ReworkIQ keeps you ahead of quality issues.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="group bg-card rounded-2xl border border-border p-8 hover:border-primary/50 transition-all hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Smartphone className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mobile Data Capture</h3>
                  <p className="text-muted-foreground mb-4">
                    Operators capture defects, measurements, and observations in seconds 
                    from any smartphone. No training required.
                  </p>
                  <ul className="space-y-2">
                    {['Photo & video capture', 'Voice-to-text notes', 'Barcode/QR scanning', 'Offline-first sync'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="group bg-card rounded-2xl border border-border p-8 hover:border-primary/50 transition-all hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Monitor className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Command Center Dashboard</h3>
                  <p className="text-muted-foreground mb-4">
                    See everything happening across your operation in real-time. 
                    Drill down from plant-wide to individual work orders.
                  </p>
                  <ul className="space-y-2">
                    {['Live rework tracking', 'Cost impact analysis', 'Trend visualization', 'Custom report builder'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="group bg-card rounded-2xl border border-border p-8 hover:border-primary/50 transition-all hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Predictive ML Engine</h3>
                  <p className="text-muted-foreground mb-4">
                    Our machine learning models learn your operation's patterns and 
                    predict quality issues before they cause rework.
                  </p>
                  <ul className="space-y-2">
                    {['Defect probability scoring', 'Root cause correlation', 'Early warning alerts', 'Continuous model training'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="group bg-card rounded-2xl border border-border p-8 hover:border-primary/50 transition-all hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enterprise Ready</h3>
                  <p className="text-muted-foreground mb-4">
                    Built for manufacturing at scale with security, compliance, 
                    and integrations that fit your existing stack.
                  </p>
                  <ul className="space-y-2">
                    {['SSO & role-based access', 'ERP/MES integrations', 'SOC 2 compliant', 'On-prem deployment option'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-32 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              From chaos to clarity in 3 steps
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in minutes, not months. No complex implementations or IT projects.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect Your Data",
                description: "Import historical quality data or start fresh. Integrate with your ERP, MES, or just use our mobile app."
              },
              {
                step: "02",
                title: "Capture Everything",
                description: "Your team logs issues, measurements, and observations from any device. Data flows in real-time."
              },
              {
                step: "03",
                title: "Act on Insights",
                description: "Our ML engine spots patterns humans miss. Get alerts before problems escalate to costly rework."
              }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Trusted by manufacturing leaders
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "We reduced rework costs by 38% in the first quarter. The predictive alerts alone paid for the entire platform.",
                author: "Sarah Chen",
                role: "VP of Quality, Precision Manufacturing Co."
              },
              {
                quote: "Finally, a quality tool our operators actually use. The mobile capture is so intuitive, adoption was instant.",
                author: "Mike Rodriguez",
                role: "Operations Director, Industrial Solutions Inc."
              },
              {
                quote: "The ML insights surfaced a supplier issue we'd been chasing for months. Game changer for our root cause analysis.",
                author: "Jennifer Walsh",
                role: "Quality Manager, Advanced Components Ltd."
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-5 h-5 text-warning">★</div>
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary/5 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Stop fighting yesterday's problems
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of quality and operations leaders who've transformed their 
            approach to rework. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-12 px-8 gap-2">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8">
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required · 14-day trial · Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">ReworkIQ</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 ReworkIQ. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
