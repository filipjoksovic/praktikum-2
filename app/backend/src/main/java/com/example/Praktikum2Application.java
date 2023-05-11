package com.example;

import com.example.models.Family;
import com.example.models.Item;
import com.example.models.ShoppingList;
import com.example.models.User;
import com.example.repositories.FamilyRepository;
import com.example.repositories.ItemRepository;
import com.example.repositories.ShoppingListRepository;
import com.example.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class Praktikum2Application {

	public static void main(String[] args) {
		SpringApplication.run(Praktikum2Application.class, args);
	}

//	@Bean
//	CommandLineRunner runner(ShoppingListRepository shoppingListRepository) {
//		return args -> {
//			// Create a new ShoppingList instance
//			ShoppingList shoppingList = new ShoppingList();
//
//			// Set properties of the shopping list
//			shoppingList.setItemList(Arrays.asList(
//					new Item("Item 1"),
//					new Item("Item 2"),
//					new Item("Item 3")
//			));
//
//			// Insert the shopping list into the repository
//			shoppingListRepository.insert(shoppingList);
//		};
//	}

}
