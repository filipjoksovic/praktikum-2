package com.wishlist.exceptions;

public class ListDoesNotExistException extends RuntimeException{
    public ListDoesNotExistException(){
        super("List with the given id does not exist");
    }
    public ListDoesNotExistException(String id){
        super("List with the given id " + id + " does not exist");
    }
}
