//---- ERROR HANDLING
export const error_messages = {
    yaml_to_config: 'Failed to convert yaml to config'
}
export const errors = {
    yaml_to_config() {
        return new Error(error_messages.yaml_to_config)
    }
}
