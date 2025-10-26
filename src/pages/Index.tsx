import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Ticket {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'in_progress' | 'completed';
  createdAt: string;
}

const mockTickets: Ticket[] = [
  { id: '1', title: 'Настройка доступа к корпоративной почте', category: 'Доступ к системам', priority: 'high', status: 'new', createdAt: '26.10.2025 09:30' },
  { id: '2', title: 'Установка MS Office на новом рабочем месте', category: 'Установка ПО', priority: 'medium', status: 'new', createdAt: '26.10.2025 10:15' },
  { id: '3', title: 'Проблема с VPN подключением', category: 'Доступ к системам', priority: 'critical', status: 'in_progress', createdAt: '25.10.2025 16:45' },
  { id: '4', title: 'Запрос на создание учетной записи 1С', category: 'Доступ к системам', priority: 'medium', status: 'in_progress', createdAt: '25.10.2025 14:20' },
  { id: '5', title: 'Настройка принтера в кабинете 305', category: 'Рабочее место', priority: 'low', status: 'completed', createdAt: '24.10.2025 11:00' },
  { id: '6', title: 'Консультация по использованию CRM', category: 'Использование систем', priority: 'low', status: 'completed', createdAt: '23.10.2025 15:30' },
];

const categories = [
  { value: 'call', label: 'Заказать звонок', icon: 'Phone' },
  { value: 'usage', label: 'Обращение по использованию корпоративных систем', icon: 'HelpCircle' },
  { value: 'access', label: 'Обращение по доступу к корпоративным системам', icon: 'Key' },
  { value: 'workplace', label: 'Обращение по созданию или обслуживанию физического рабочего места', icon: 'Monitor' },
  { value: 'software', label: 'Обращение по установке программного обеспечения рабочего места', icon: 'Download' },
  { value: 'initiative', label: 'Бизнес-инициатива', icon: 'Lightbulb' },
];

const infoSections = [
  { title: 'Расписание работы специалистов', icon: 'Calendar', color: 'bg-blue-50 hover:bg-blue-100 border-blue-200' },
  { title: 'Порядок работы при аварийной ситуации', icon: 'AlertTriangle', color: 'bg-red-50 hover:bg-red-100 border-red-200' },
  { title: 'Информация по приоритетам запросов и SLA', icon: 'Clock', color: 'bg-green-50 hover:bg-green-100 border-green-200' },
  { title: 'Инструкция по работе с порталом', icon: 'BookOpen', color: 'bg-purple-50 hover:bg-purple-100 border-purple-200' },
  { title: 'FAQ готовые ответы', icon: 'MessageCircle', color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200' },
  { title: 'Обратная связь', icon: 'Mail', color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200' },
];

const priorityConfig = {
  low: { label: 'Низкий', color: 'bg-gray-100 text-gray-700 border-gray-300' },
  medium: { label: 'Средний', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  high: { label: 'Высокий', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  critical: { label: 'Критический', color: 'bg-red-100 text-red-700 border-red-300' },
};

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');

  const newTickets = mockTickets.filter(t => t.status === 'new');
  const inProgressTickets = mockTickets.filter(t => t.status === 'in_progress');
  const completedTickets = mockTickets.filter(t => t.status === 'completed');

  const handleSubmit = () => {
    console.log('Создание заявки:', { category: selectedCategory, description });
    setSelectedCategory('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Headphones" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">Портал техподдержки</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-3 py-1">
                <Icon name="User" size={14} className="mr-2" />
                Иванов И.И.
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-md border-gray-200">
            <CardHeader className="pb-4 border-b border-gray-100">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Icon name="FilePlus" size={20} className="text-blue-600" />
                Новая заявка
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Категория обращения</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <Icon name={cat.icon as any} size={16} />
                          <span className="text-sm">{cat.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Описание проблемы</Label>
                <Textarea 
                  placeholder="Подробно опишите вашу проблему или вопрос..." 
                  className="min-h-[140px] resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleSubmit} 
                className="w-full bg-primary hover:bg-primary/90" 
                size="lg"
                disabled={!selectedCategory || !description}
              >
                <Icon name="Send" size={18} className="mr-2" />
                Отправить заявку
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md border-gray-200">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Icon name="Clock" size={20} className="text-orange-600" />
                  Заявки в работе
                </CardTitle>
                <Badge className="bg-orange-600">{inProgressTickets.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 max-h-[400px] overflow-y-auto">
              {inProgressTickets.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">Нет заявок в работе</p>
              ) : (
                inProgressTickets.map(ticket => (
                  <div key={ticket.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm text-gray-900 flex-1">{ticket.title}</h4>
                      <Badge variant="outline" className={`ml-2 text-xs ${priorityConfig[ticket.priority].color}`}>
                        {priorityConfig[ticket.priority].label}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{ticket.category}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Icon name="Clock" size={12} className="mr-1" />
                      {ticket.createdAt}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md border-gray-200">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Icon name="CheckCircle2" size={20} className="text-green-600" />
                  Завершенные заявки
                </CardTitle>
                <Badge className="bg-green-600">{completedTickets.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 max-h-[400px] overflow-y-auto">
              {completedTickets.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">Нет завершенных заявок</p>
              ) : (
                completedTickets.map(ticket => (
                  <div key={ticket.id} className="p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm text-gray-900 flex-1">{ticket.title}</h4>
                      <Badge variant="outline" className={`ml-2 text-xs ${priorityConfig[ticket.priority].color}`}>
                        {priorityConfig[ticket.priority].label}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{ticket.category}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Icon name="Clock" size={12} className="mr-1" />
                      {ticket.createdAt}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {infoSections.map((section, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-auto py-4 px-5 justify-start text-left ${section.color} border-2 transition-all hover:shadow-md`}
            >
              <Icon name={section.icon as any} size={20} className="mr-3 flex-shrink-0" />
              <span className="font-medium text-sm">{section.title}</span>
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
}
