'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  BarChart3, 
  Settings, 
  Shield, 
  Database,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Sparkles,
  Crown,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react'
import Link from 'next/link'

interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalApps: number
  publishedApps: number
  totalRevenue: number
  monthlyRevenue: number
  totalTemplates: number
  pendingReviews: number
}

interface User {
  id: string
  name: string
  email: string
  plan: 'free' | 'pro' | 'business'
  credits: number
  apps: number
  joinDate: string
  status: 'active' | 'suspended' | 'pending'
}

interface AppData {
  id: string
  name: string
  author: string
  category: string
  status: 'published' | 'draft' | 'review' | 'rejected'
  views: number
  created: string
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'apps' | 'templates' | 'settings'>('overview')
  const [searchTerm, setSearchTerm] = useState('')

  const stats: AdminStats = {
    totalUsers: 12847,
    activeUsers: 8934,
    totalApps: 45623,
    publishedApps: 32156,
    totalRevenue: 284750,
    monthlyRevenue: 45890,
    totalTemplates: 1247,
    pendingReviews: 23
  }

  const users: User[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@exemplo.com',
      plan: 'pro',
      credits: 1250,
      apps: 8,
      joinDate: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@exemplo.com',
      plan: 'business',
      credits: 5000,
      apps: 15,
      joinDate: '2024-01-10',
      status: 'active'
    },
    {
      id: '3',
      name: 'Pedro Costa',
      email: 'pedro@exemplo.com',
      plan: 'free',
      credits: 150,
      apps: 2,
      joinDate: '2024-01-20',
      status: 'pending'
    },
    {
      id: '4',
      name: 'Ana Oliveira',
      email: 'ana@exemplo.com',
      plan: 'pro',
      credits: 800,
      apps: 12,
      joinDate: '2024-01-05',
      status: 'suspended'
    }
  ]

  const apps: AppData[] = [
    {
      id: '1',
      name: 'Chatbot Atendimento',
      author: 'João Silva',
      category: 'Chatbot',
      status: 'published',
      views: 1247,
      created: '2024-01-15'
    },
    {
      id: '2',
      name: 'Dashboard Vendas',
      author: 'Maria Santos',
      category: 'Dashboard',
      status: 'review',
      views: 0,
      created: '2024-01-22'
    },
    {
      id: '3',
      name: 'CRM Simples',
      author: 'Pedro Costa',
      category: 'CRM',
      status: 'draft',
      views: 0,
      created: '2024-01-20'
    }
  ]

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-gray-100 text-gray-800'
      case 'pro': return 'bg-purple-100 text-purple-800'
      case 'business': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'pro': return <Zap className="w-3 h-3" />
      case 'business': return <Crown className="w-3 h-3" />
      default: return <Sparkles className="w-3 h-3" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'published': return 'bg-green-100 text-green-800'
      case 'pending':
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'suspended':
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'published': return <CheckCircle className="w-3 h-3" />
      case 'pending':
      case 'review': return <AlertTriangle className="w-3 h-3" />
      case 'suspended':
      case 'rejected': return <XCircle className="w-3 h-3" />
      default: return <Activity className="w-3 h-3" />
    }
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
                kportugal.ai
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/editor" className="text-gray-300 hover:text-white transition-colors">Editor</Link>
              <Link href="/marketplace" className="text-gray-300 hover:text-white transition-colors">Marketplace</Link>
              <Link href="/admin" className="text-white font-medium">Admin</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Badge className="bg-red-100 text-red-800 flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Admin</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-400">
            Gerencie usuários, aplicações e configurações da plataforma
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-900/50 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Visão Geral', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'users', label: 'Usuários', icon: <Users className="w-4 h-4" /> },
            { id: 'apps', label: 'Aplicações', icon: <Database className="w-4 h-4" /> },
            { id: 'templates', label: 'Templates', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'settings', label: 'Configurações', icon: <Settings className="w-4 h-4" /> }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              className={`flex items-center space-x-2 ${
                activeTab === tab.id 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Total de Usuários</p>
                      <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                      <p className="text-xs text-green-400 mt-1">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        +12% este mês
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Apps Publicadas</p>
                      <p className="text-2xl font-bold text-white">{stats.publishedApps.toLocaleString()}</p>
                      <p className="text-xs text-green-400 mt-1">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        +8% este mês
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <Database className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Receita Mensal</p>
                      <p className="text-2xl font-bold text-white">€{stats.monthlyRevenue.toLocaleString()}</p>
                      <p className="text-xs text-green-400 mt-1">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        +15% este mês
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Pendentes</p>
                      <p className="text-2xl font-bold text-white">{stats.pendingReviews}</p>
                      <p className="text-xs text-yellow-400 mt-1">
                        <AlertTriangle className="w-3 h-3 inline mr-1" />
                        Requer atenção
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Atividade Recente</CardTitle>
                <CardDescription className="text-gray-400">
                  Últimas ações na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Novo usuário registrado', user: 'Ana Costa', time: '2 min atrás', type: 'user' },
                    { action: 'App publicada', user: 'João Silva', time: '15 min atrás', type: 'app' },
                    { action: 'Template aprovado', user: 'Maria Santos', time: '1h atrás', type: 'template' },
                    { action: 'Upgrade para Pro', user: 'Pedro Lima', time: '2h atrás', type: 'upgrade' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'user' ? 'bg-blue-600/20' :
                          activity.type === 'app' ? 'bg-green-600/20' :
                          activity.type === 'template' ? 'bg-purple-600/20' :
                          'bg-yellow-600/20'
                        }`}>
                          {activity.type === 'user' && <Users className="w-4 h-4 text-blue-400" />}
                          {activity.type === 'app' && <Database className="w-4 h-4 text-green-400" />}
                          {activity.type === 'template' && <Sparkles className="w-4 h-4 text-purple-400" />}
                          {activity.type === 'upgrade' && <Crown className="w-4 h-4 text-yellow-400" />}
                        </div>
                        <div>
                          <p className="text-white text-sm">{activity.action}</p>
                          <p className="text-gray-400 text-xs">{activity.user}</p>
                        </div>
                      </div>
                      <span className="text-gray-400 text-xs">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Gestão de Usuários</h2>
              <Button className="bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Novo Usuário
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Pesquisar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-800">
                      <tr>
                        <th className="text-left p-4 text-gray-300 font-medium">Usuário</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Plano</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Créditos</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Apps</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                          <td className="p-4">
                            <div>
                              <div className="text-white font-medium">{user.name}</div>
                              <div className="text-gray-400 text-sm">{user.email}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={`${getPlanColor(user.plan)} flex items-center space-x-1 w-fit`}>
                              {getPlanIcon(user.plan)}
                              <span className="capitalize">{user.plan}</span>
                            </Badge>
                          </td>
                          <td className="p-4 text-white">{user.credits.toLocaleString()}</td>
                          <td className="p-4 text-white">{user.apps}</td>
                          <td className="p-4">
                            <Badge className={`${getStatusColor(user.status)} flex items-center space-x-1 w-fit`}>
                              {getStatusIcon(user.status)}
                              <span className="capitalize">{user.status}</span>
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Apps Tab */}
        {activeTab === 'apps' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Gestão de Aplicações</h2>
              <div className="flex items-center space-x-2">
                <Badge className="bg-yellow-100 text-yellow-800">
                  {stats.pendingReviews} pendentes
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Pesquisar aplicações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-800">
                      <tr>
                        <th className="text-left p-4 text-gray-300 font-medium">Aplicação</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Autor</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Categoria</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Views</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApps.map((app) => (
                        <tr key={app.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                          <td className="p-4">
                            <div className="text-white font-medium">{app.name}</div>
                          </td>
                          <td className="p-4 text-gray-300">{app.author}</td>
                          <td className="p-4 text-gray-300">{app.category}</td>
                          <td className="p-4">
                            <Badge className={`${getStatusColor(app.status)} flex items-center space-x-1 w-fit`}>
                              {getStatusIcon(app.status)}
                              <span className="capitalize">{app.status}</span>
                            </Badge>
                          </td>
                          <td className="p-4 text-white">{app.views.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {app.status === 'review' && (
                                <>
                                  <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Gestão de Templates</h2>
              <Button className="bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Novo Template
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">Template {i}</CardTitle>
                        <CardDescription className="text-gray-400">
                          Categoria exemplo
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Aprovado</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Downloads: 1,234
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Configurações do Sistema</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Configurações Gerais</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configurações básicas da plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome da Plataforma
                    </label>
                    <Input
                      defaultValue="kportugal.ai"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Domínio Principal
                    </label>
                    <Input
                      defaultValue="kportugal.ai"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Salvar Alterações
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Limites e Quotas</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure limites por plano
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Créditos Free (mensal)
                    </label>
                    <Input
                      type="number"
                      defaultValue="300"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Apps máximas Free
                    </label>
                    <Input
                      type="number"
                      defaultValue="3"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Atualizar Limites
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}