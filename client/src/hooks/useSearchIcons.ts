import { getIcons } from "@/api/get/icon";
import { useQuery } from "@tanstack/react-query";

export const useSearchIcons = (searchIcon: string | undefined) => {

    const { data, isLoading } = useQuery({
        queryKey: ['icons'],
        queryFn: getIcons,
    });

    const matchingIcons = data && searchIcon && data.uncategorized
        .filter((icon: string) => icon.toLowerCase().includes(searchIcon))
        .slice(0, 8); 

    return {
        matchingIcons,
        isSearchingIcons: isLoading
    }
}