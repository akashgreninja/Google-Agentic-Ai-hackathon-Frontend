// sidebar.jsx or Sidebar.jsx

import { Car, Flame, Droplet, Megaphone, Music2, Wrench } from 'lucide-react';

import { useState } from 'react';
import GlassPopup from './GlassPopup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

// Sample event items with valid icon components
const eventSidebarItems = [
  {
    type: 'Flood',
    icon: Droplet,
    title: 'Flood near MG Road',
    description:
      "#write 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Cowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhoelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Cowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhoelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Cowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhoelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Cowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhoelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Cowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhoelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Cowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhoelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Cowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhowrite 2 paras of a story coping the style of the first 2 paras of the story in the book 'The Alchemist' by Paulo Coelhoelho",
    severity: 'high',
    timestamp: '10 mins ago',
  },
  {
    type: 'Concert',
    icon: Music2,
    title: 'Live concert @ Indiranagar',
    description: 'Traffic diversions near Sony Signal.',
    severity: 'low',
    timestamp: '30 mins ago',
  },
  {
    type: 'Accident',
    icon: Car,
    title: 'Car crash @ Silk Board',
    description: 'Two-wheeler and cab collided, traffic building up.',
    severity: 'medium',
    timestamp: '15 mins ago',
  },
  {
    type: 'Fire',
    icon: Flame,
    title: 'Fire near Koramangala 4th Block',
    description: 'Smoke spotted near apartment complex. Fire dept en route.',
    severity: 'high',
    timestamp: '5 mins ago',
  },
  {
    type: 'Protest',
    icon: Megaphone,
    title: 'Protest @ Town Hall',
    description: 'Demonstrators blocking road, avoid via JC Road.',
    severity: 'medium',
    timestamp: '1 hour ago',
  },
  {
    type: 'Maintenance',
    icon: Wrench,
    title: 'Road repair @ HSR Layout',
    description: 'BBMP patching potholes. One lane closed.',
    severity: 'low',
    timestamp: '2 hours ago',
  },
];

export const Sidebar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      <div
        className="w-80 bg-sidebar-custom-background h-full overflow-y-auto"
        style={{ width: '100%' }}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Nearby Events</h2>
          <div className="space-y-3">
            {eventSidebarItems.map((event, index) => {
              const Icon = event.icon;
              const severityColor =
                event.severity === 'high'
                  ? 'bg-red-500'
                  : event.severity === 'medium'
                  ? 'bg-yellow-500'
                  : 'bg-green-500';

              return (
                <Card
                  key={index}
                  onClick={() => setSelectedEvent(event)}
                  className="cursor-pointer border border-border bg-card hover:bg-hover-subtle transition-colors"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          {Icon && <Icon className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="flex flex-col">
                          <CardTitle className="text-sm font-medium">{event.title}</CardTitle>
                          <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                        </div>
                      </div>
                      <span
                        className={`w-2 h-2 rounded-full ${severityColor}`}
                        title={`Severity: ${event.severity}`}
                      ></span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                      {event.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Glassmorphic Popup */}
      <GlassPopup
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        data={selectedEvent}
      />
    </>
  );
};
