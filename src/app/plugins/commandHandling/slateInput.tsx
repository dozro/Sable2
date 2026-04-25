import React from 'react';
import { AbstractCommand } from './AbstractCommand';
import * as css from './slateInput.css';

type InputElementForParams = {
  attributeType?: string;
  helpText?: string;
  placeHolder?: string;
  required: boolean;
  onChange: (val: any) => void;
};

function InputElementFor({
  attributeType,
  helpText,
  placeHolder,
  onChange,
  required = false,
}: Readonly<InputElementForParams>) {
  if (attributeType === undefined || attributeType === 'string' || attributeType === 'custom') {
    return (
      <input
        type="text"
        title={helpText}
        placeholder={placeHolder}
        required={required}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
      />
    );
  }
  if (attributeType === 'color') {
    return (
      <input
        type="color"
        title={helpText}
        placeholder={placeHolder}
        required={required}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
      />
    );
  }
  if (attributeType === 'boolean') {
    return (
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          onChange(e.target.selectedOptions[0].value === 'true');
        }}
        required={required}
      >
        <option value="false">false</option>
        <option value="true">true</option>
      </select>
    );
  }
}

type SlateInputForCommandProps = {
  command: AbstractCommand;
  commandNameClassName: string;
};

export function SlateInputForCommand({
  command,
  commandNameClassName,
}: Readonly<SlateInputForCommandProps>) {
  return (
    <span className={css.CommandInline} contentEditable={false}>
      <strong className={commandNameClassName} title={command.getCommandDefinition().description}>
        {`/${command.getCommandDefinition().id}`}
      </strong>
      {command.getCommandDefinition().attributes?.map((attr) => (
        <span className={css.CommandAttribute} key={attr.id}>
          <span className={css.CommandAttributeLabel}>{attr.id}</span>
          <InputElementFor
            attributeType={attr.type}
            helpText={attr.description}
            placeHolder={attr.exampleValue}
            onChange={(value) => {
              if (value === null || value === undefined || value === '') return;
              command.updateArgValue(attr.id, value);
            }}
            required={attr.required}
          />
        </span>
      ))}
    </span>
  );
}
