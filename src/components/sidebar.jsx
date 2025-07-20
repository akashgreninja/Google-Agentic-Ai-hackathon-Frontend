import {
  MapPin,
  Navigation,
  Search,
  Settings,
  Star,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const sidebarItems = [
  {
    icon: MapPin,
    title: "Saved Locations",
    description: "Your favorite places and bookmarks",
  },
  {
    icon: Navigation,
    title: "Recent Routes",
    description: "View your navigation history",
  },
  {
    icon: Search,
    title: "Search Places",
    description: "Find locations and businesses",
  },
  {
    icon: Star,
    title: "Reviews",
    description: "Rate and review locations",
  },
  {
    icon: Users,
    title: "Share Location",
    description: "Share your location with friends",
  },
  {
    icon: Settings,
    title: "Map Settings",
    description: "Customize your map preferences",
  },
];

export const Sidebar = () => {
  return (
    <div className="w-80 bg-sidebar-custom-background border-r border-sidebar-custom-border h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Quick Access
        </h2>
        <div className="space-y-3">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={index}
                className="cursor-pointer transition-colors hover:bg-hover-subtle border-border"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-sm font-medium">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
