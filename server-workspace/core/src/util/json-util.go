package util

import (
	"encoding/json"
	"os"
	"reflect"
	"unsafe"
)

func SaveToJSON(filePath string, data interface{}) error {
	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ") // Pretty print JSON
	return encoder.Encode(data)
}

func SaveArrayToJSON[T any](filename string, data []T) error {
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ") // Pretty print JSON
	return encoder.Encode(data)
}

func ToJSONFromObject(data interface{}) (string, error) {
	v := reflect.ValueOf(data).Elem()
	t := v.Type()

	exportedMap := make(map[string]interface{})

	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)

		// Use unsafe to access unexported fields
		field = reflect.NewAt(field.Type(), unsafe.Pointer(field.UnsafeAddr())).Elem()

		exportedMap[t.Field(i).Name] = field.Interface()
	}

	jsonData, err := json.Marshal(exportedMap)
	if err != nil {
		return "", err
	}

	return string(jsonData), nil
}

func ToJSON(v interface{}) (string, error) {
	jsonBytes, err := json.Marshal(v)
	if err != nil {
		return "", err
	}
	return string(jsonBytes), nil
}

func CompareJSON(json1, json2 string) bool {
	var obj1, obj2 interface{}

	err1 := json.Unmarshal([]byte(json1), &obj1)
	err2 := json.Unmarshal([]byte(json2), &obj2)

	if err1 != nil || err2 != nil {
		return false
	}

	return reflect.DeepEqual(obj1, obj2)
}
