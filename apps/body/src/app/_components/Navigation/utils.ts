export const isSelected = (pathname: string, route: string[]) => {
    if (route[0] === '/') {
        return route[0] === pathname;
    } else {
        for (const r of route) {
            if (pathname.includes(r)) {
                return true;
            }
        }
    }
};
