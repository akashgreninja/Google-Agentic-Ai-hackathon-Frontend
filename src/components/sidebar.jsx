// sidebar.jsx or Sidebar.jsx

import { Car, Flame, Droplet, Megaphone, Music2, Wrench } from 'lucide-react';

import { useState } from 'react';
import GlassPopup from './GlassPopup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import iconMap from '../constants/maps';
import { Spin, Tabs } from 'antd';

const CustomCard = ({ data, setSelectedEvent, title }) => (
  <div className="p-4" style={{ overflowY: 'scroll', height: '80vh' }}>
    <h2 className="text-lg font-semibold text-foreground mb-4">{title}</h2>
    {!data && (
      <div className="flex items-center justify-center" style={{ width: '100%', height: '10rem' }}>
        <Spin />
      </div>
    )}
    <div className="space-y-3">
      {data?.incidents?.map((event, index) => {
        const Icon =
          iconMap[event.category?.split(' ').join('').toLowerCase()] || iconMap['default'];
        const severityColor = colorMap[event.severity];

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
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
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
                {event.summary}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
);
const colorMap = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
};
export const Sidebar = ({ data, onChange, selectedApi }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  return (
    <>
      <div
        className="w-80 bg-sidebar-custom-background h-full overflow-y-auto"
        style={{ width: '100%' }}
      ></div>
      <Tabs
        defaultActiveKey="tab1"
        activeKey={selectedApi}
        items={[
          {
            key: 'tab1',
            label: 'Nearby Events',
            children: (
              <CustomCard data={data} setSelectedEvent={setSelectedEvent} title={'Nearby Events'} />
            ),
          },
          {
            key: 'tab2',
            label: 'Preferences',
            children: (
              <CustomCard
                data={data}
                setSelectedEvent={setSelectedEvent}
                title={'Events Based On Your Preferences'}
              />
            ),
          },
        ]}
        onChange={onChange}
      />
      {/* Glassmorphic Popup */}
      <GlassPopup
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        data={selectedEvent}
      />
    </>
  );
};
