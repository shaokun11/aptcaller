package keeper

import (
	"context"
	"encoding/hex"
	"fmt"
	"strconv"

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
	chainUrl, err := apt.ParseChain(msg.Header)
	if err != nil {
		return nil, err
	}
	finalURL := fmt.Sprintf("%s/transactions", chainUrl)
	body, err := hex.DecodeString(msg.Body)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "parse body error")
	}
	res, err := apt.Post(finalURL, string(body), msg.Header)
	ctx.EventManager().EmitEvent(
		sdk.NewEvent("SubmitTransactionEvent",
			sdk.NewAttribute("body", res.AptRes.Body),
			sdk.NewAttribute("header", res.AptRes.Header),
			sdk.NewAttribute("code", strconv.FormatUint(uint64(res.AptRes.Code), 10)),
		),
	)
	ret := types.MsgSubmitTransactionResponse{
		AptRes: &types.AptRes{
			Body:   res.AptRes.Body,
			Header: res.AptRes.Header,
			Code:   res.AptRes.Code,
		},
	}
	return &ret, err
}
