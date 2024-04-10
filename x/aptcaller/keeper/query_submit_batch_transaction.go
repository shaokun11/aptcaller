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

func (k Keeper) SubmitBatchTransaction(goCtx context.Context, req *types.QuerySubmitBatchTransactionRequest) (*types.QuerySubmitBatchTransactionResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	baseURL := fmt.Sprintf("%s/transactions/batch", apt.Url)
	header := apt.ParseHeader(req.Header)
	res, err := apt.Post(baseURL, req.Body, header)
	ret := types.QuerySubmitBatchTransactionResponse(*res)
	return &ret, err
}
