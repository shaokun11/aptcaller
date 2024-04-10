package keeper

import (
	"context"
	"encoding/hex"
	"fmt"

	"aptcaller/apt"
	"aptcaller/x/aptcaller/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k msgServer) SubmitTransaction(goCtx context.Context, msg *types.MsgSubmitTransaction) (*types.MsgSubmitTransactionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx
	k.SaveTx(ctx, types.AptTx{
		Creator: msg.Creator,
		AptTx:   msg.Body,
		Id:      0,
	})
	finalURL := fmt.Sprintf("%s/transactions", apt.Url)
	body, err := hex.DecodeString(msg.Body)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "parse body error")
	}
	header, err := apt.ParseHeader(msg.Header)
	if err != nil {
		return nil, err
	}
	res, err := apt.Post(finalURL, string(body), header)
	ret := types.MsgSubmitTransactionResponse(*res)
	return &ret, err
}
