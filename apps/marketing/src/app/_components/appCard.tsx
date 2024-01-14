import { FC } from 'react';
import { Card, CardFooter, Image, Button, CardHeader } from '@nextui-org/react';

interface AppCardProps {
    appName: string;
    image: string;
}

export const AppCard: FC<AppCardProps> = ({ appName, image }) => {
    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="h-[250px] w-[200px] border-none"
        >
            <Image
                alt=""
                className="object-cover"
                height={200}
                src={image}
                width={200}
            />
            <CardFooter className="border-1 rounded-large shadow-small absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden border-white/20 py-1 before:rounded-xl before:bg-white/10">
                <p className="text-tiny text-white">{appName}</p>
                <Button
                    className="text-tiny bg-black/20 text-white"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                >
                    Get Started
                </Button>
            </CardFooter>
        </Card>
    );
};
