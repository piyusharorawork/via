package util

import "testing"

type MyType struct {
	name   string
	age    int
	height float64
}

func TestToJSONFromObject(t *testing.T) {
	tt := []struct {
		name    string
		data    interface{}
		want    string
		wantErr bool
	}{
		{
			name: "success",
			data: &MyType{
				name:   "piyush",
				age:    30,
				height: 6.0,
			},
			want:    "{\"age\":30,\"height\":6.0,\"name\":\"piyush\"}",
			wantErr: false,
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			got, err := ToJSONFromObject(tc.data)
			if (err != nil) != tc.wantErr {
				t.Errorf("ToJSONFromObject() error = %v, wantErr %v", err, tc.wantErr)
				return
			}
			if !CompareJSON(got, tc.want) {
				t.Errorf("ToJSONFromObject() = %v, want %v", got, tc.want)
			}
		})
	}
}
