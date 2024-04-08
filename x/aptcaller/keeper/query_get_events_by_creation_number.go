package keeper

import (
	"context"
	"fmt"
	"net/url"
	"strings"

	"aptcaller/apt"
	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetEventsByCreationNumber(goCtx context.Context, req *types.QueryGetEventsByCreationNumberRequest) (*types.QueryGetEventsByCreationNumberResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	addr := strings.ToLower(req.Address)
	baseURL := fmt.Sprintf("%s/accounts/%s/events/%s", apt.Url, addr, req.CreationNumber)
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
	ret := types.QueryGetEventsByCreationNumberResponse(*res)
	return &ret, err
}
