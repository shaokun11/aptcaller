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

func (k Keeper) GetTransactions(goCtx context.Context, req *types.QueryGetTransactionsRequest) (*types.QueryGetTransactionsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx

	baseURL := fmt.Sprintf("%s/transactions ", apt.Url)
	urlObj, _ := url.Parse(baseURL)
	params := url.Values{}
	if apt.IsValidQueryStringNum(req.Limit) {
		params.Add("limit", req.Limit)
	}
	if apt.IsValidQueryStringNum(req.Start) {
		params.Add("start", req.Start)
	}
	urlObj.RawQuery = params.Encode()
	finalURL := urlObj.String()
	res, err := apt.Call(finalURL)
	ret := types.QueryGetTransactionsResponse(*res)
	return &ret, err
}
