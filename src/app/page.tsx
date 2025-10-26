'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Sparkles, 
  Zap, 
  Globe, 
  Code, 
  Users, 
  Shield, 
  ArrowRight, 
  Check,
  Star,
  Rocket,
  Crown,
  Building
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Editor Visual Drag & Drop",
      description: "Crie apps complexas arrastando e soltando componentes. Sem código necessário."
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      title: "Deploy Automático",
      description: "Publique sua app com 1 clique. Subdomínio automático e SSL incluído."
    },
    {
      icon: <Code className="w-8 h-8 text-green-400" />,
      title: "Exportação de Código",
      description: "Acesso ao código gerado e exportação para repositório Git."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Marketplace",
      description: "Venda seus templates e compre soluções prontas da comunidade."
    },
    {
      icon: <Shield className="w-8 h-8 text-red-400" />,
      title: "Segurança Avançada",
      description: "Autenticação robusta e proteção de dados de nível empresarial."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-pink-400" />,
      title: "IA Integrada",
      description: "Assistente IA que ajuda a criar e otimizar suas aplicações."
    }
  ]

  const plans = [
    {
      name: "Free",
      price: 0,
      creditsText: "300",
      icon: <Star className="w-6 h-6" />,
      features: [
        "300 créditos mensais",
        "3 apps ativas",
        "Templates básicos",
        "Subdomínio kportugal.ai",
        "Suporte por email"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: 29,
      creditsText: "2.000",
      icon: <Rocket className="w-6 h-6" />,
      features: [
        "2.000 créditos mensais",
        "Apps ilimitadas",
        "Todos os templates",
        "Domínio personalizado",
        "Exportação de código",
        "Suporte prioritário",
        "Analytics avançadas"
      ],
      popular: true
    },
    {
      name: "Business",
      price: 99,
      creditsText: "10.000",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "10.000 créditos mensais",
        "Tudo do Pro",
        "White-label",
        "API personalizada",
        "Integrações avançadas",
        "Suporte 24/7",
        "Gerente de conta dedicado"
      ],
      popular: false
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Escolha um Template",
      description: "Selecione entre centenas de templates prontos ou comece do zero."
    },
    {
      number: "02", 
      title: "Personalize com IA",
      description: "Use nosso editor visual para personalizar cada detalhe da sua app."
    },
    {
      number: "03",
      title: "Publique Instantaneamente",
      description: "Com 1 clique, sua app está online e acessível para o mundo."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
                kportugal.ai
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Funcionalidades</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">Como Funciona</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Planos</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contacto</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Entrar
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-600/30">
            🚀 Novo: Editor IA com 300 créditos grátis
          </Badge>
          <h1 className="text-3xl font-bold text-white mb-2 lasy-highlight">
            Bem-vindo, KPortugal.ai, a INTELIGENCIA ARTIFICIAL Nº1 👋
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            — sem código.
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            A kportugal.ai democratiza a criação de software inteligente. 
            Transforme ideias em produtos digitais reais com nosso editor visual alimentado por IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white px-8 py-4 text-lg">
                Começar Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-600/10 px-8 py-4 text-lg">
                Ver Templates
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-gray-400">Apps Criadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Funcionalidades Poderosas
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Tudo que precisa para criar, personalizar e publicar aplicações profissionais
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-purple-600/50 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Três passos simples para ter sua app online
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-yellow-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-6 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Planos para Todos
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comece grátis e escale conforme cresce
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-yellow-500 scale-105' : 'border-gray-800'} bg-gray-900/50 hover:scale-105 transition-all duration-300`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-yellow-600 text-white">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    {plan.icon}
                    <CardTitle className="text-2xl text-white ml-2">{plan.name}</CardTitle>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    €{plan.price}
                    <span className="text-lg text-gray-400">/mês</span>
                  </div>
                  <CardDescription className="text-gray-400">
                    {plan.creditsText} créditos incluídos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/dashboard">
                    <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700' : 'bg-gray-800 hover:bg-gray-700'} text-white`}>
                      {plan.price === 0 ? 'Começar Grátis' : 'Escolher Plano'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Entre em Contacto
            </h2>
            <p className="text-xl text-gray-400">
              Tem dúvidas? Estamos aqui para ajudar
            </p>
          </div>
          
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mensagem
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Como podemos ajudar?"
                    rows={4}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/40 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
                  kportugal.ai
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Democratizando a criação de software inteligente para todos.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/editor" className="hover:text-white transition-colors">Editor</Link></li>
                <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Planos</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutoriais</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 kportugal.ai. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}