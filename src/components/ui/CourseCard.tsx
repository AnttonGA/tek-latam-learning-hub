
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
}

const CourseCard = ({
  title,
  instructor,
  level,
  students,
  description,
  imageUrl,
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <span className="bg-teklatam-blue/10 text-teklatam-blue text-xs px-2 py-1 rounded">
            {level}
          </span>
          <div className="flex items-center text-xs text-gray-500">
            <Users className="h-3 w-3 mr-1" />
            {students.toLocaleString()}
          </div>
        </div>
        <CardTitle className="mt-2 text-xl">{title}</CardTitle>
        <CardDescription className="text-teklatam-orange">
          {instructor}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 flex-grow">
        <p className="text-teklatam-gray-600 line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="pt-4">
        <Button className="w-full teklatam-btn-primary">Ver detalles</Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
