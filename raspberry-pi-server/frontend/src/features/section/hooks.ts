import { useAddSectionMutation } from '../../app/sectionsApi';
import { getErrorMessage } from '../../helpers/errorMessage';
import { useGetStorageAndSections } from '../storage/hooks';

export const useAddSection = () => {
    const { data, isLoading, error } = useGetStorageAndSections();
    const [
        addSection,
        { isLoading: isAddSectionLoading, error: addSectionError },
    ] = useAddSectionMutation();

    return {
        addSection,
        data,
        isLoading: isLoading || isAddSectionLoading,
        error: getErrorMessage(addSectionError) ?? error,
    };
};
