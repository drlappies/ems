import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

function Config(props) {
    const { isConfigOpen, configType, configSize, configPrimaryAction, configPrimaryFunc, configPrimaryColor, configSecondaryAction, configSecondaryColor, configSecondaryFunc, configTertiaryAction, configTertiaryFunc, configTertiaryColor } = props

    return (
        <Modal
            open={isConfigOpen}
            size={configSize}
        >
            <Modal.Header>
                {configType}
            </Modal.Header>
            <Modal.Content>
                {props.children}
            </Modal.Content>
            <Modal.Actions>
                {configPrimaryAction ? <Button size="small" color={configPrimaryColor} onClick={configPrimaryFunc}>{configPrimaryAction}</Button> : null}
                {configSecondaryAction ? <Button size="small" color={configSecondaryColor} onClick={configSecondaryFunc}>{configSecondaryAction}</Button> : null}
                {configTertiaryAction ? <Button size="small" color={configTertiaryColor} onClick={configTertiaryFunc}>{configTertiaryAction}</Button> : null}
            </Modal.Actions>
        </Modal>
    )
}

export default Config
