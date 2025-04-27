
package com.fleetvehicles.model;

public enum ProviderStatus {
    ACTIVE("active"),
    INACTIVE("inactive");
    
    private final String value;
    
    ProviderStatus(String value) {
        this.value = value;
    }
    
    public String getValue() {
        return value;
    }
    
    public static ProviderStatus fromValue(String value) {
        for (ProviderStatus status : ProviderStatus.values()) {
            if (status.getValue().equals(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid ProviderStatus value: " + value);
    }
}
