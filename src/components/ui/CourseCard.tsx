
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface CourseCardProps {
  title: string;
  instructor: string;
  level: string;
  students: number;
  description: string;
  imageUrl: string;
  onClick?: () => void;
}

const CourseCard = ({
  title,
  instructor,
  level,
  students,
  description,
  imageUrl,
  onClick
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{instructor} • {level}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          <span>{students.toLocaleString()} estudiantes</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-teklatam-blue hover:bg-teklatam-blue/90"
          onClick={onClick}
        >
          Más información
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
