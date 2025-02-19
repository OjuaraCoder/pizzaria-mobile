import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../services/api";
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../routes/app.routes";

type RouteDetailParams = {
  Order: {
    number: string | number;
    order_id: string;
  };
};

export type CategoryProps = {
  id: string;
  name: string;
};

type ProductProps = {
  id: string;
  name: string;
};

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>();
  const [modalProductVisible, setModalProductVisible] = useState(false);

  const [amount, setAmount] = useState("1");
  const [items, setItems] = useState<ItemProps[]>([]);

  //quando a tela for aberta, este metodo é executado
  useEffect(() => {
    async function loadInfo() {
      const response = await api.get("/category");

      setCategory(response.data);
      setCategorySelected(response.data[0]);
    }

    loadInfo();
  }, []);

  //chamar apenas quando o categorySelected for selecionado
  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/category/product", {
        params: {
          category_id: categorySelected?.id,
        },
      });
      //console.log(response.data);
      setProducts(response.data);
      setProductSelected(response.data[0]);
    }

    loadProducts();
  }, [categorySelected]);

  async function handleCloseOrder() {
    try {
      await api.delete("/order", {
        params: {
          order_id: route.params?.order_id,
        },
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  function handlechangeCategory(item: CategoryProps) {
    setCategorySelected(item);
  }

  function handlechangeProduct(item: CategoryProps) {
    setProductSelected(item);
  }

  //adicionando item a order
  async function handleAdd() {
    const response = await api.post("/order/add", {
      order_id: route.params?.order_id,
      product_id: productSelected?.id,
      amount: Number(amount),
    });

    let data = {
      id: response.data.id,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: amount,
    };

    //incluindo um item ao setitems, caso já exista algum outro item, é adicionado um novo item
    setItems((oldArray) => [...oldArray, data]);
  }

  async function handleDeleteItem(item_id: string) {
    const response = await api.delete("/order/remove", {
      params: {
        item_id: item_id,
      },
    });

    // apos remover o item da base, remover o item da lista de items
    let removeItem = items.filter((item) => {
      return item.id !== item_id;
    });
    setItems(removeItem);
  }

  function handleFinishOrder() {
    navigation.navigate("FinishOrder", {
      number: route.params.number,
      order_id: route.params.order_id,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>

        {items.length === 0 && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name="trash-2" size={28} color="#ff3f4b" />
          </TouchableOpacity>
        )}
      </View>

      {category.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
          <Text style={{ color: "#fff" }}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
          <Text style={{ color: "#fff" }}>{productSelected?.name}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={[styles.input, { width: "65%", textAlign: "center" }]}
          placeholder="1"
          placeholderTextColor="#f0f0f0"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
          disabled={items.length === 0}
          onPress={handleFinishOrder}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 20 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}
      />

      <Modal transparent={true} visible={modalCategoryVisible} animationType="fade">
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handlechangeCategory}
        />
      </Modal>

      <Modal transparent={true} visible={modalProductVisible} animationType="fade">
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handlechangeProduct}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1D2E",
    paddingVertical: "5%",
    paddingEnd: "4%",
    paddingStart: "4%",
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 14,
  },
  input: {
    backgroundColor: "#101026",
    width: "100%",
    height: 50,
    marginBottom: 12,
    justifyContent: "center",
    paddingHorizontal: 8,
    color: "#fff",
    fontSize: 22,
  },
  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtdText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    height: 40,
  },
  actions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonAdd: {
    width: "20%",
    backgroundColor: "#3fd1ff",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#101026",
    fontSize: 22,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  button: {
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    height: 40,
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
});
