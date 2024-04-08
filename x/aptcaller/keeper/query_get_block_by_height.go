package keeper

import (
	"context"
	"fmt"
	"net/url"

	"aptcaller/apt"
	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetBlockByHeight(goCtx context.Context, req *types.QueryGetBlockByHeightRequest) (*types.QueryGetBlockByHeightResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	baseURL := fmt.Sprintf("%s/blocks/by_height/%s", apt.Url, req.BlockHeight)
	urlObj, _ := url.Parse(baseURL)
	params := url.Values{}
	if req.WithTransactions == 1 {
		params.Add("with_transactions", "true")
	}
	urlObj.RawQuery = params.Encode()
	finalURL := urlObj.String()
	res, err := apt.Call(finalURL)
	ret := types.QueryGetBlockByHeightResponse(*res)
	return &ret, err
}
