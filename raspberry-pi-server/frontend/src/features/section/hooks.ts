import { useSectionIdParams } from '../../app/hooks';
import {
    useAddSectionMutation,
    useUpdateSectionMutation,
} from '../../app/sectionsApi';
import { Section, Storage } from '../../app/types';
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

export const useUpdateSection = () => {
    const sectionId = useSectionIdParams();
    const { data, isLoading, error } = useGetStorageAndSections();
    const [
        updateSection,
        { isLoading: isLoadingUpdate, error: updateSectionError },
    ] = useUpdateSectionMutation();

    let dataToReturn:
        | { storage: Storage; sections: Section[]; section: Section }
        | undefined = undefined;
    let errorToReturn = getErrorMessage(updateSectionError) ?? error;
    if (!errorToReturn && data) {
        const section = data.sections.find((s) => s.id === sectionId);
        if (section) {
            const sections = data.sections.filter((s) => s.id !== sectionId);
            dataToReturn = { storage: data.storage, sections, section };
        } else {
            errorToReturn = `Section ${sectionId} doesn't exist under storage ${data.storage.id}`;
        }
    }

    return {
        editSection: updateSection,
        isLoading: isLoading || isLoadingUpdate,
        error: errorToReturn,
        data: dataToReturn,
    };
};
