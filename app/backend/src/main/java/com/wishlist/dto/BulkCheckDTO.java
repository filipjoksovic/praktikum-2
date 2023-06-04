package com.wishlist.dto;

public class BulkCheckDTO {
    private String[] ids;
    private boolean allSelected;

    public BulkCheckDTO() {
    }

    public BulkCheckDTO(String[] ids) {
        this.ids = ids;
    }

    public String[] getIds() {
        return ids;
    }

    public void setIds(String[] ids) {
        this.ids = ids;
    }

    public boolean isAllSelected() {
        return allSelected;
    }

    public void setAllSelected(boolean allSelected) {
        this.allSelected = allSelected;
    }
}
