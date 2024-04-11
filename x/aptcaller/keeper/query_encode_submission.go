package keeper

import (
	"context"
	"fmt"

	"aptcaller/apt"
	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) EncodeSubmission(goCtx context.Context, req *types.QueryEncodeSubmissionRequest) (*types.QueryEncodeSubmissionResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	chainUrl, err := apt.ParseChain(req.Header)
	if err != nil {
		return nil, err
	}
	baseURL := fmt.Sprintf("%s/transactions/encode_submission ", chainUrl)
	res, err := apt.Post(baseURL, req.Body, req.Header)
	ret := types.QueryEncodeSubmissionResponse(*res)
	return &ret, err
}
