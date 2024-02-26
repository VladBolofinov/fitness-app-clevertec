import {IApiRequest} from "@redux/types/IApiRequestSlice";

export const isLoadingRequestSelector = (state: IApiRequest) => state.apiRequestSlice.isLoadingRequest;
