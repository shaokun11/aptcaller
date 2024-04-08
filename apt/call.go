package apt

import (
	"aptcaller/x/aptcaller/types"
	"encoding/json"
	"io"
	"net/http"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Header struct {
	Epoch      string `json:"X-Aptos-Epoch"`
	Height     string `json:"X-Aptos-Block-Height"`
	OldHeight  string `json:"X-Aptos-Oldest-Block-Height"`
	ChainId    string `json:"X-Aptos-Chain-Id"`
	Version    string `json:"X-Aptos-Ledger-Version"`
	OldVersion string `json:"X-Aptos-Ledger-Oldest-Version"`
	Ts         string `json:"X-Aptos-Ledger-Timestampusec"`
}

func Call(url string) (*types.QueryGetAccountResponse, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, status.Error(codes.Unavailable, err.Error())
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {

		return nil, status.Error(codes.Internal, err.Error())
	}
	headerBytes, _ := json.Marshal(Header{
		Epoch:      resp.Header.Get("X-Aptos-Epoch"),
		Height:     resp.Header.Get("X-Aptos-Block-Height"),
		OldHeight:  resp.Header.Get("X-Aptos-Oldest-Block-Height"),
		ChainId:    resp.Header.Get("X-Aptos-Chain-Id"),
		Version:    resp.Header.Get("X-Aptos-Ledger-Version"),
		OldVersion: resp.Header.Get("X-Aptos-Ledger-Oldest-Version"),
		Ts:         resp.Header.Get("X-Aptos-Ledger-Timestampusec"),
	})
	return &types.QueryGetAccountResponse{
		AptRes: &types.AptRes{
			Header: string(headerBytes),
			Body:   string(body),
			Code:   uint32(resp.StatusCode),
		},
	}, nil
}
